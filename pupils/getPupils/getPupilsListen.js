const verifyToken = require("../../jwt/verifyTokenToAdmin");
const getPupilsDB = require("./getPupilsDB");
module.exports = function getPupilsListen(app) {
  app.get("/api/get_pupils", verifyToken, (req, res) => {
    getPupilsDB(function callbackForResponse(response) {
      res.send(response);
    });
  });
};
