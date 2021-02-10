const updatePointsDB = require("./updatePointsDB");

const verifyToken = require("../../jwt/verifyTokenToAdmin");

module.exports = function updatePointsListen(app) {
  app.put("/api/update_points", verifyToken, (req, res) => {
    const objIdAndPoinst = req.body;
    if (validation(objIdAndPoinst)) {
      updatePointsDB(objIdAndPoinst, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};
function validation(objIdAndPoinst) {
  if (
    validationIsEmpty(objIdAndPoinst) &&
    validationKeys(objIdAndPoinst) &&
    validationValues(objIdAndPoinst)
  )
    return true;
  return false;
}
function validationIsEmpty(objIdAndPoinst) {
  if (
    Object.keys(objIdAndPoinst).length === 0 &&
    objIdAndPoinst.constructor === Object
  ) {
    return false;
  }
  return true;
}
function validationKeys(objIdAndPoinst) {
  if (
    Object.keys(objIdAndPoinst).every((key) => {
      return +key < 999999999 && +key > 100000000;
    })
  )
    return true;
}

function validationValues(objIdAndPoinst) {
  if (
    Object.values(objIdAndPoinst).every((value) => {
      return typeof value === "number";
    })
  )
    return true;
}
