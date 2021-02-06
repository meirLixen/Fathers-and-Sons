const { Pool } = require("pg");
const pgConfig = require("./pgConfig");
const pool = new Pool(pgConfig);

const tableDeals = `CREATE TABLE IF NOT EXISTS deals(
  _uuid uuid DEFAULT uuid_generate_v4 (),
  business_uuid uuid NOT NULL,
  pupil_uuid uuid NOT NULL,
  "businessBrand" text NOT NULL,
  "pupilFullName" text NOT NULL,
  "numberFromCard" numeric,
  "moreDetails" text,
  price text,
  time timestamp DEFAULT now ()
  );`;

module.exports = async function createTableDeals() {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(tableDeals)
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
