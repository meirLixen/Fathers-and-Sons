const { Pool } = require("pg");
const pgConfig = require("./pgConfig");
const pool = new Pool(pgConfig);

const tablePupil = `CREATE TABLE IF NOT EXISTS pupils (
  _uuid uuid DEFAULT uuid_generate_v4 (),
  id integer UNIQUE CHECK (id > 100000000),
 "firstName" text NOT NULL CHECK (char_length("firstName") > 1),
 "lastName" text NOT NULL CHECK (char_length("lastName") > 1),
 points integer CHECK (points > -1),
 "moreDetails" text,
 "numberFromCard" numeric UNIQUE 
 );`;

module.exports = async function createTablePupils() {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(tablePupil)
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
