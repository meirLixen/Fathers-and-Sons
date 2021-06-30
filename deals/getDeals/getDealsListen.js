const verifyToken = require("../../jwt/verifyTokenToAdmin");
const getDealsDB = require("./getDealsDB");
module.exports = function getDealsListen(app) {
  app.get("/api/get_deals", verifyToken, (req, res) => {
    getDealsDB(function callbackForResponse(response) {
      res.send(response);
    });
  });
};
