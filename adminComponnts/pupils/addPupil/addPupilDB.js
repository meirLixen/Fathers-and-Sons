const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function addPupilDB(newPupil, callbackForResponse) {
  const insertnewPupil = {
    text: `INSERT INTO pupils (id, "firstName", "lastName", points, "moreDetails", "numberFromCard") VALUES($1,$2,$3,$4,$5,$6)`,
    values: [
      newPupil.id,
      newPupil.firstName,
      newPupil.lastName,
      newPupil.points || 0,
      newPupil.moreDetails || "",
      newPupil.numberFromCard,
    ],
  };
  pool
    .connect()
    .then((client) => {
      return client
        .query(insertnewPupil)
        .then(() => {
          client.release();
          callbackForResponse("created pupil in DB");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
