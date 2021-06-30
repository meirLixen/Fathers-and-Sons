const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);
const writeDealInDB = require("./5writeDealInDB");
module.exports = async function businessAmountToPay(data, callbackForResponse) {
  var query = `UPDATE businesses SET 
  "amountToPay" = "amountToPay" + ${data.price}
  WHERE _uuid = '${data.business._uuid}';
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
