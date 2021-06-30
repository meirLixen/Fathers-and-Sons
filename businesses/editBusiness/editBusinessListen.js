const editBusinessDB = require("./editBusinessDB");

const verifyToken = require("../../jwt/verifyTokenToAdmin");
module.exports = function editBusinessListen(app) {
  app.put("/api/edit_business", verifyToken, (req, res) => {
    const updatedBusiness = req.body;

    if (validation(updatedBusiness)) {
      editBusinessDB(updatedBusiness, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(updatedBusiness) {
  if (
    validationBrand(updatedBusiness.brand) &&
    validationContact(updatedBusiness.contact) &&
    validationPhone(updatedBusiness.phone) &&
    validationEmail(updatedBusiness.email) &&
    validationPassword(updatedBusiness.password) &&
    validationAmountToPay(updatedBusiness.amountToPay) &&
    validationUuid(updatedBusiness._uuid)
  ) {
    return true;
  }
}
function validationBrand(brand) {
  if (brand && typeof brand === "string" && brand.length > 1) {
    return true;
  }
}

function validationContact(contact) {
  if (contact && typeof contact === "string" && contact.length > 1) {
    return true;
  }
}
function validationPhone(phone) {
  if (phone && typeof phone === "number" && phone > 100000000) {
    return true;
  }
}

function validationEmail(email) {
  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    email &&
    typeof email === "string" &&
    validEmail.test(String(email).toLowerCase())
  ) {
    return true;
  }
}
function validationPassword(password) {
  if (
    (password &&
      typeof password === "string" &&
      password.length > 7 &&
      password.length < 30) ||
    password === ""
  ) {
    return true;
  }
}
function validationAmountToPay(amountToPay) {
  const validAmountToPay = /\d{1,3}(?:[.]\d{2})/;
  if (
    amountToPay &&
    typeof amountToPay === "string" &&
    validAmountToPay.test(String(amountToPay))
  ) {
    return true;
  }
}
function validationUuid(uuid) {
  if (uuid && typeof uuid === "string" && uuid.length > 20 && uuid.length < 100)
    return true;
}
