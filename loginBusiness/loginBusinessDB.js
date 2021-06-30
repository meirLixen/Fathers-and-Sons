const { Pool } = require("pg");
const pgConfig = require("../tables/pgConfig");
const pool = new Pool(pgConfig);
const validPassword = require("./validPassword");

module.exports = async function loginBusinessDB(
  emailAndPassword,
  callbackForResponse
) {
  const loginBusiness = `SELECT * FROM businesses WHERE email='${emailAndPassword.email}';`;
  return pool
    .connect()
    .then((client) => {
      return client
        .query(loginBusiness)
        .then((res) => {
          if (res.rows[0]) {
            validPassword(
              emailAndPassword.password,
              res.rows[0],
              callbackForResponse
            );
          } else {
            callbackForResponse("לא נמצא משתמש עם כתובת המייל שסופקה");
          }
          client.release();
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err);
        });
    })
    .catch((err) => console.error(err));
};
