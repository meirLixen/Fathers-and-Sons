const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function updatedPupilDB(
  updatedPupil,
  callbackForResponse
) {
  var query = `UPDATE pupils SET 
  id = ${updatedPupil.id},
  "firstName" = '${updatedPupil.firstName}',
  "lastName" = '${updatedPupil.lastName}',
  points = ${updatedPupil.points},
  "moreDetails" = '${updatedPupil.moreDetails}',
  "numberFromCard" = ${updatedPupil.numberFromCard}
  
  WHERE _uuid = '${updatedPupil._uuid}';
  `;
  pool
    .connect()
    .then((client) => {
      return client
        .query(query)
        .then((v) => {
          client.release();
          callbackForResponse("הנתונים נשמרו");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
