const fs = require("fs");
const listData = [];
const {
   MigrateCategories,
   MigrateUtils,
   MigrateRealEstate,
   MigrateUsers
} = require("./src/migrate/index");

//const getRealEstate = require('./crawl_data/migrate/getApartmentForSale')

const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err, db) {
    if (!err) console.log("Connecting database");
    else {
      console.log(err)
    }
      // List Function migrate First
      {
        // MigrateCategories();
        // MigrateUtils();
        MigrateUsers();
      }
      // the second
      {
        //MigrateRealEstate()
      }
    } 
    
);

