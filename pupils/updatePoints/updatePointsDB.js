const { Pool } = require("pg");
const pgConfig = require("../../tables/pgConfig");
const pool = new Pool(pgConfig);

module.exports = async function updatePointsDB(
  objIdAndPoinst,
  callbackForResponse
) {
  var str = ``;
  for (const property in objIdAndPoinst) {
    str += `(${property},${objIdAndPoinst[property]}),`;
  }
  str = str.slice(0, -1);
  var query = `update pupils as pupil set 
    points = pupil.points + newData.points
    from (values
        ${str}
      ) as newData(id, points)
      where newData.id = pupil.id;
    `;
  pool
    .connect()
    .then((client) => {
      return client
        .query(query)
        .then((v) => {
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
