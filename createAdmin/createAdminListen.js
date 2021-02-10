const createAdminDB = require("./createAdminDB");
const verifyToken = require("../jwt/verifyTokenToAdmin");
module.exports = function createAdminListen(app) {
  app.post("/api/create_admin", verifyToken, (req, res) => {
    const newAdmin = req.body;

    if (validation(newAdmin)) {
      createAdminDB(newAdmin, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(newAdmin) {
  if (
    validationFirstName(newAdmin.firstName) &&
    validationLastName(newAdmin.lastName) &&
    validationId(newAdmin.id) &&
    validationEmail(newAdmin.email) &&
    validationPassword(newAdmin.password)
  ) {
    return true;
  }
}

function validationFirstName(firstName) {
  if (firstName && typeof firstName === "string" && firstName.length > 1) {
    return true;
  }
}

function validationLastName(lastName) {
  if (lastName && typeof lastName === "string" && lastName.length > 1) {
    return true;
  }
}
function validationId(id) {
  if (id && typeof id === "number" && id > 100000000) {
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
