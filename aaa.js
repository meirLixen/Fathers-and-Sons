var bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const pgConfig = require("./tables/pgConfig");
const pool = new Pool(pgConfig);

async function createAdminUser(newAdmin) {
  var hashedPassword = bcrypt.hashSync(newAdmin.password, 8);
  const insertNewAdmin = `INSERT INTO administrators
  (id,firstName,lastName,email,password)
  SELECT 
  ${newAdmin.id},
  '${newAdmin.firstName}',
  '${newAdmin.lastName}', 
  '${newAdmin.email}', 
  '${hashedPassword}'
  WHERE
    NOT EXISTS (
        SELECT id FROM administrators WHERE id = 305711426
    );
  `;

  pool
    .connect()
    .then((client) => {
      return client
        .query(insertNewAdmin)
        .then(() => {
          client.release();
        })
        .catch((err) => {
          client.release();
          console.error(err);
        });
    })
    .catch((err) => console.error(err));
}
const newAdmin = {
  firstName: "meir",
  lastName: "lixenbrg",
  id: 305711426,
  email: "m0527685598@gmail.com",
  password: "12345678",
};

createAdminUser(newAdmin);
