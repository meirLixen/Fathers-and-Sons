const { Pool } = require("pg");
const pgConfig = require("../../adminComponnts/tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function writeDealInDB(data, callbackForResponse) {
  const insertnewDeal = {
    text: `INSERT INTO deals 
        (business_uuid, 
        pupil_uuid, 
        "businessBrand", 
        "pupilFullName", 
        "numberFromCard", 
        "moreDetails", 
        price) 
        VALUES($1,$2,$3,$4,$5,$6,$7)`,
    values: [
      data.business._uuid,
      data.pupil._uuid,
      data.business.brand,
      `${data.pupil.firstName} ${data.pupil.lastName}`,
      data.numberFromCard,
      data.moreDetails || "",
      data.price,
    ],
  };

  pool
    .connect()
    .then((client) => {
      return client
        .query(insertnewDeal)
        .then((v) => {
          client.release();
          callbackForResponse("ok");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
