const mongoose = require("mongoose");
const { db, app } = require("../config/config");

const dbURL = `${db.uri}-${app?.environment}`;
if (!dbURL) console.error("Mongo URL not set in env file or config.js");

mongoose.connect(dbURL, (error) => {
  if (error) {
    console.error(`failed to connect using mongoose. ${error}`);
  } else { 
    console.info(`Connected to DB server. ${dbURL}`);
  }
});

module.exports = mongoose;  
