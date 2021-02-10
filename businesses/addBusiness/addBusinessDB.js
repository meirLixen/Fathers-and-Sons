const { Pool } = require("pg");
var bcrypt = require("bcryptjs");

const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function addBusinessDB(
  newBusiness,
  callbackForResponse
) {
  var hashedPassword = bcrypt.hashSync(newBusiness.password, 8);
  const insertnewBusiness = {
    text: `INSERT INTO businesses (brand, contact, phone, email, password, "moreDetails", "amountToPay") VALUES($1,$2,$3,$4,$5,$6,$7)`,
    values: [
      newBusiness.brand,
      newBusiness.contact,
      newBusiness.phone,
      newBusiness.email,
      hashedPassword,
      "",
      0,
    ],
  };
  pool
    .connect()
    .then((client) => {
      return client
        .query(insertnewBusiness)
        .then(() => {
          client.release();
          callbackForResponse("created business in DB");
        })
        .catch((err) => {
          client.release();
          console.error(err);
          callbackForResponse(err.detail);
        });
    })
    .catch((err) => console.error(err));
};
