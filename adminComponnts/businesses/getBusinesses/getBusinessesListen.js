const verifyToken = require("../../../jwt/verifyTokenToAdmin");
const getBusinessesDB = require("./getBusinessesDB");
module.exports = function getBusinessesListen(app) {
  app.get("/api/get_businesses", verifyToken, (req, res) => {
    getBusinessesDB(function callbackForResponse(response) {
      res.send(response);
    });
  });
};
