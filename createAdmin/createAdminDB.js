var bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const pgConfig = require("../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function addPupilDB(newAdmin, callbackForResponse) {
  var hashedPassword = bcrypt.hashSync(newAdmin.password, 8);
  const insertNewAdmin = {
    text:
      "INSERT INTO administrators (id, firstName, lastName, email, password) VALUES($1,$2,$3,$4,$5)",
    values: [
      newAdmin.id,
      newAdmin.firstName,
      newAdmin.lastName,
      newAdmin.email,
      hashedPassword,
    ],
  };
  pool
    .connect()
    .then((client) => {
      return client
        .query(insertNewAdmin)
        .then(() => {
          client.release();
          callbackForResponse("created Admin in DB");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
