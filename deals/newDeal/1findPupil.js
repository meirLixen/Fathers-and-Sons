const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);
const checkPoints = require("./2checkPoints");
module.exports = async function findPupil(data, callbackForResponse) {
  const query = `SELECT * FROM pupils WHERE "numberFromCard"='${data.numberFromCard}';`;
  return pool
    .connect()
    .then((client) => {
      return client
        .query(query)
        .then((res) => {
          if (res.rows[0]) {
            data.pupil = res.rows[0];
            checkPoints(data, callbackForResponse);
          } else {
            callbackForResponse("לא נמצא תלמיד עם הכרטיס הזה");
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
