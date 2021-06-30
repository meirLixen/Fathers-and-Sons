const jwt = require("jsonwebtoken");
module.exports = function createToken(userFromDB, callbackForResponse) {
  var token = jwt.sign({ _uuid: userFromDB._uuid }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
  callbackForResponse({ token });
};
