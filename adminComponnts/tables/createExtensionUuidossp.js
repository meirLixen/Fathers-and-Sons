const { Pool } = require("pg");
const pgConfig = require("./pgConfig");
const pool = new Pool(pgConfig);

const query = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

module.exports = async function createExtensionUuidossp() {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(query)
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
