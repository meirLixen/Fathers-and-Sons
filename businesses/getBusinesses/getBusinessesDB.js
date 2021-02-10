const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);
module.exports = async function getBusinessesDB(callbackForResponse) {
  const getBusinesses = `SELECT * FROM businesses;`;
  return pool
    .connect()
    .then((client) => {
      return client
        .query(getBusinesses)
        .then((res) => {
          client.release();
          if (res.rows[0]) return callbackForResponse(res.rows);
          callbackForResponse("לא נמצאו רשומות");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err);
        });
    })
    .catch((err) => console.error(err));
};
