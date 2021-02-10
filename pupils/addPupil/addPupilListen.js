const addPupilDB = require("./addPupilDB");
const verifyToken = require("../../jwt/verifyTokenToAdmin");

module.exports = function addPupilListen(app) {
  app.post("/api/add_pupil", verifyToken, (req, res) => {
    const newPupil = req.body;
    if (validation(newPupil)) {
      addPupilDB(newPupil, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(newPupil) {
  if (
    validationFirstName(newPupil.firstName) &&
    validationLastName(newPupil.lastName) &&
    validationId(newPupil.id) &&
    validationPoints(newPupil.points)
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

function validationPoints(points) {
  if (points === undefined || (typeof points === "number" && points > -1)) {
    return true;
  }
}
