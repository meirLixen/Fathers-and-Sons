const editPupilDB = require("./editPupilDB");

const verifyToken = require("../../jwt/verifyTokenToAdmin");
module.exports = function editPupilListen(app) {
  app.put("/api/edit_pupil", verifyToken, (req, res) => {
    const updatedPupil = req.body;

    if (validation(updatedPupil)) {
      editPupilDB(updatedPupil, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validation(updatedPupil) {
  if (
    validationFirstName(updatedPupil.firstName) &&
    validationLastName(updatedPupil.lastName) &&
    validationId(updatedPupil.id) &&
    validationPoints(updatedPupil.points) &&
    validationUuid(updatedPupil._uuid)
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
function validationUuid(uuid) {
  if (uuid && typeof uuid === "string" && uuid.length > 20 && uuid.length < 100)
    return true;
}
