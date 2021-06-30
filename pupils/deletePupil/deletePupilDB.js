const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function deletePupilDB(_uuid, callbackForResponse) {
  const deletePupil = `DELETE FROM pupils WHERE _uuid='${_uuid}';`;

  pool
    .connect()
    .then((client) => {
      return client
        .query(deletePupil)
        .then(() => {
          client.release();
          callbackForResponse("deleted pupil in DB");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
