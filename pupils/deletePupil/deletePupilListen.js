const verifyToken = require("../../jwt/verifyTokenToAdmin");
const deletePupilDB = require("./deletePupilDB");
module.exports = function deletePupilListen(app) {
  app.delete("/api/delete_pupil", verifyToken, (req, res) => {
    const _uuid = req.body._uuid;
    if (validationUuid(_uuid)) {
      deletePupilDB(_uuid, function callbackForResponse(response) {
        res.send(response);
      });
    } else {
      res.send("לא הצלחנו לאמת את הנתונים ששלחת");
    }
  });
};

function validationUuid(uuid) {
  if (uuid && typeof uuid === "string" && uuid.length > 20 && uuid.length < 100)
    return true;
}
