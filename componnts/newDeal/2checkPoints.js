// const { Pool } = require("pg");
// const pgConfig = require("../../adminComponnts/tables/pgConfig");
// const pool = new Pool(pgConfig);
const reducesPointsToPupil = require("./3reducesPointsToPupil");
module.exports = async function checkPoints(data, callbackForResponse) {
  var convertPriceToPoints = parseFloat(data.price).toFixed(1) * 10;
  if (convertPriceToPoints > data.pupil.points)
    return callbackForResponse("There are not enough points");

  data.convertPriceToPoints = convertPriceToPoints;
  reducesPointsToPupil(data, callbackForResponse);
};
