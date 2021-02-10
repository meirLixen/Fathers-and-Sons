var jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const pgConfig = require("../tables/pgConfig");
const pool = new Pool(pgConfig);

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    checkPermission(decoded._uuid).then((e) => {
      if (typeof e === "object") {
        res.locals.business = e;
        next();
      } else {
        res.send("err");
      }
    });
  });
}

module.exports = verifyToken;

function checkPermission(_uuid) {
  const query = `SELECT * FROM businesses WHERE _uuid='${_uuid}';`;

  return pool
    .connect()
    .then((client) => {
      return client
        .query(query)
        .then((v) => {
          client.release();
          if (v.rows[0]) {
            return v.rows[0];
            // next();
          } else {
            // return res.send("אין לך הרשאה לגשת לאזור זה באתר");
            return "not authorized";
          }
        })
        .catch((err) => {
          client.release();
          console.error(err);
          return err;
        });
    })
    .catch((err) => err);
}
// app.use(function (req, res, next) {
//   res.locals.user = req.user
//   res.locals.authenticated = !req.user.anonymous
//   next()
// })
