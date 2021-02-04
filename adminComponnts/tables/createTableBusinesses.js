const { Pool } = require("pg");
const pgConfig = require("./pgConfig");
const pool = new Pool(pgConfig);

const tableBusiness = `CREATE TABLE IF NOT EXISTS businesses (
 _uuid uuid DEFAULT uuid_generate_v4 (),
 brand text,
 contact text,
 phone numeric NOT NULL UNIQUE,
 email text NOT NULL UNIQUE,
 password text NOT NULL,
 "moreDetails" text
 );`;

module.exports = async function createTableBusinesses() {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(tableBusiness)
        .then(() => {
          client.release();
        })
        .catch((err) => {
          console.error(err);
          client.release();
        });
    })
    .catch((err) => console.error(err));
};
