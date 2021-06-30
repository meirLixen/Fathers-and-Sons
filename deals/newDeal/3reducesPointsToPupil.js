const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

const businessAmountToPay = require("./4businessAmountToPay");
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
          businessAmountToPay(data, callbackForResponse);
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
