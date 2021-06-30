const addBusinessDB = require("./addBusinessDB");
const verifyToken = require("../../jwt/verifyTokenToAdmin");
module.exports = function addBusinessListen(app) {
  app.post("/api/add_business", verifyToken, (req, res) => {
    const newBusiness = req.body;
    if (validation(newBusiness)) {
      addBusinessDB(newBusiness, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(newBusiness) {
  if (
    validationBrand(newBusiness.brand) &&
    validationContact(newBusiness.contact) &&
    validationPhone(newBusiness.phone) &&
    validationEmail(newBusiness.email) &&
    validationPassword(newBusiness.password)
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
  if (password && typeof password === "string" && password.length > 7) {
    return true;
  }
}
