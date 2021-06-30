const createToken = require("./createToken");
const bcrypt = require("bcryptjs");
module.exports = function validPassword(
  passwordFromUser,
  userFromDB,
  callbackForResponse
) {
  var passwordIsValid = bcrypt.compareSync(
    passwordFromUser,
    userFromDB.password
  );
  if (!passwordIsValid) return callbackForResponse("סיסמה שגויה");

  createToken(userFromDB, callbackForResponse);
};
