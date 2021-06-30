const verifyToken = require("../../jwt/verifyTokenToAdmin");
const deleteBusinessDB = require("./deleteBusinessDB");
module.exports = function deleteBusinessListen(app) {
  app.delete("/api/delete_business", verifyToken, (req, res) => {
    const _uuid = req.body._uuid;
    if (validationUuid(_uuid)) {
      deleteBusinessDB(_uuid, function callbackForResponse(response) {
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
