require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(function (req, res, next) {
  setTimeout(() => {
    next();
  }, 500);
});
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
//routes of businesses
require("./componnts/loginBusiness/loginBusinessListen")(app);
require("./componnts/newDeal/newDealListen")(app);
//routes of admin for businesses
require("./adminComponnts/businesses/getBusinesses/getBusinessesListen")(app);
require("./adminComponnts/businesses/addBusiness/addBusinessListen")(app);
require("./adminComponnts/businesses/deleteBusiness/deleteBusinessListen")(app);
require("./adminComponnts/businesses/editBusiness/editBusinessListen")(app);
// create tables in DB
require("./adminComponnts/tables/createExtensionUuidossp")();
require("./adminComponnts/tables/createTableAdmin")();
require("./adminComponnts/tables/createTablePupils")();
require("./adminComponnts/tables/createTableBusinesses")();
//routes of create admin and login admin
require("./adminComponnts/createAdmin/createAdminListen")(app);
require("./adminComponnts/loginAdmin/loginAdminListen")(app);
//routes of admin for pupils
require("./adminComponnts/pupils/addPupil/addPupilListen")(app);
require("./adminComponnts/pupils/getPupils/getPupilsListen")(app);
require("./adminComponnts/pupils/deletePupil/deletePupilListen")(app);
require("./adminComponnts/pupils/updatePoints/updatePointsListen")(app);
require("./adminComponnts/pupils/editPupil/editPupilListen")(app);

app.listen(process.env.PORT || 9000, (err) => {
  if (err) return console.log(err);
  console.log("connect");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
});
