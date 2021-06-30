const findPupil = require("./1findPupil");
const verifyTokenToBusiness = require("../../jwt/verifyTokenToBusiness");

module.exports = function newDealListen(app) {
  app.post("/api/new_deal", verifyTokenToBusiness, (req, res) => {
    const cardPriceMoreDetails = req.body;
    if (validation(cardPriceMoreDetails)) {
      cardPriceMoreDetails.business = res.locals.business;
      const data = cardPriceMoreDetails;
      findPupil(data, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(cardPriceMoreDetails) {
  if (
    validationNumberFromCard(cardPriceMoreDetails.numberFromCard) &&
    validationPrice(cardPriceMoreDetails.price) &&
    validationMoreDetails(cardPriceMoreDetails.moreDetails)
  ) {
    return true;
  }
}
function validationNumberFromCard(numberFromCard) {
  if (numberFromCard) {
    return true;
  }
}

function validationPrice(price) {
  const validPrice = /\d{1,3}(?:[.]\d{2})/;
  if (price && typeof price === "string" && validPrice.test(String(price))) {
    return true;
  }
}

function validationMoreDetails(moreDetails) {
  return true;
}
