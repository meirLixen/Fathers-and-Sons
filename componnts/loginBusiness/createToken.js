const jwt = require("jsonwebtoken");
module.exports = function createToken(userFromDB, callbackForResponse) {
  var token = jwt.sign({ _uuid: userFromDB._uuid }, process.env.SECRET, {
    expiresIn: 3000000000, // expires in 30 days
  });
  callbackForResponse({ token });
};
