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
require("./tables/createExtensionUuidossp")() 
require("./deals/getDeals/getDealsListen")(app);
//routes of businesses
require("./loginBusiness/loginBusinessListen")(app);
require("./deals/newDeal/newDealListen")(app);
//routes of admin for businesses
require("./businesses/getBusinesses/getBusinessesListen")(app);
require("./businesses/addBusiness/addBusinessListen")(app);
require("./businesses/deleteBusiness/deleteBusinessListen")(app);
require("./businesses/editBusiness/editBusinessListen")(app);
// create tables in DB
require("./tables/createTableDeals")();
require("./tables/createExtensionUuidossp")();
require("./tables/createTableAdmin")();
require("./tables/createTablePupils")();
require("./tables/createTableBusinesses")();
//routes of create admin and login admin
require("./createAdmin/createAdminListen")(app);
require("./loginAdmin/loginAdminListen")(app);
//routes of admin for pupils
require("./pupils/addPupil/addPupilListen")(app);
require("./pupils/getPupils/getPupilsListen")(app);
require("./pupils/deletePupil/deletePupilListen")(app);
require("./pupils/updatePoints/updatePointsListen")(app);
require("./pupils/editPupil/editPupilListen")(app);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  require("./aaa");
  console.log("connect");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
});
