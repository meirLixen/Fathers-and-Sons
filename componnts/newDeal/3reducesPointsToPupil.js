const { Pool } = require("pg");
const pgConfig = require("../../adminComponnts/tables/pgConfig");
const pool = new Pool(pgConfig);
const writeDealInDB = require("./4writeDealInDB");
module.exports = async function reducesPointsToPupil(
  data,
  callbackForResponse
) {
  var query = `UPDATE pupils SET 
  points = points - ${data.convertPriceToPoints}
  WHERE _uuid = '${data.pupil._uuid}';
  `;
  pool
    .connect()
    .then((client) => {
      return client
        .query(query)
        .then((v) => {
          client.release();
          writeDealInDB(data, callbackForResponse);
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
