const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function deleteBusinessDB(_uuid, callbackForResponse) {
  const deleteBusiness = `DELETE FROM businesses WHERE _uuid='${_uuid}';`;

  pool
    .connect()
    .then((client) => {
      return client
        .query(deleteBusiness)
        .then(() => {
          client.release();
          callbackForResponse("deleted business in DB");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
