const loginAdminDB = require("./loginAdminDB");
module.exports = function loginAdminListen(app) {
  app.post("/api/login_admin", (req, res) => {
    const emailAndPassword = req.body;
console.log(emailAndPassword);
    if (validation(emailAndPassword)) {
      loginAdminDB(emailAndPassword, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(emailAndPassword) {
  if (
    validationEmail(emailAndPassword.email) &&
    validationPassword(emailAndPassword.password)
  ) {
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
