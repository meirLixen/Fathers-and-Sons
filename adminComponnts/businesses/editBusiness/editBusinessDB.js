const { Pool } = require("pg");
var bcrypt = require("bcryptjs");

const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function editBusinessDB(
  updatedBusiness,
  callbackForResponse
) {
  var queryOfPassword = "";
  if (updatedBusiness.password) {
    var hashedPassword = bcrypt.hashSync(updatedBusiness.password, 8);
    queryOfPassword = `password = '${hashedPassword}',`;
  }

  var query = `UPDATE businesses SET 
  brand = '${updatedBusiness.brand}',
  contact = '${updatedBusiness.contact}',
  phone = '${updatedBusiness.phone}',
  email = '${updatedBusiness.email}',
  ${queryOfPassword}
  "moreDetails" = '${updatedBusiness.moreDetails}'
    WHERE _uuid = '${updatedBusiness._uuid}';
  `;
  pool
    .connect()
    .then((client) => {
      return client
        .query(query)
        .then(() => {
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
