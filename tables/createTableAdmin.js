const { Pool } = require("pg");
const pgConfig = require("./pgConfig");
const pool = new Pool(pgConfig);

const tableAdmin = `CREATE TABLE IF NOT EXISTS administrators(
  _uuid uuid DEFAULT uuid_generate_v4 (),
  id integer NOT NULL UNIQUE CHECK (id > 100000000),
  firstName text NOT NULL CHECK (char_length(firstName) > 1),
  lastName text NOT NULL CHECK (char_length(lastName) > 1),
  email text NOT NULL UNIQUE CHECK (char_length(email) > 10),
  password text NOT NULL CHECK (char_length(password) > 7)
  );`;

module.exports = async function createTableAdmin() {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(tableAdmin)
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
