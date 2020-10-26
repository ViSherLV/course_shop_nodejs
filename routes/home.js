const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const keys = require('../keys');


router.get("/", async (req, res) => {
  try {
    const languagesSchema = new Schema({
      code: String,
      text: String,
    });

    const regionSchema = new Schema({
      code: String,
      text: String,
    });

    const schema = new Schema({
      languages: [languagesSchema],
      regionCode: [regionSchema],
    });

    const OUTPUT_SERVER_URL = 'mongodb+srv://Rake_System_TEST:Aj01D1dG6XPXdAIY@test-swnqr.gcp.mongodb.net/Rake-System-TEST';
    const INPUT_SERVER_URL = 'mongodb+srv://Rake_System_UAT:HWAaE9yb6SWMgppY@uat-2arol.gcp.mongodb.net/Rake-System-PROD';
    const COLLECTION_NAME = 'localizations'

    const inputServer = await mongoose.createConnection(OUTPUT_SERVER_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    const outputServer = await mongoose.createConnection(INPUT_SERVER_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    let outDB = outputServer.model(COLLECTION_NAME, schema);
    const inDB = inputServer.model(COLLECTION_NAME, schema);
    const outTable = await outDB.find({})
    const inTable = await inDB.find({});

    const allFields = outTable.concat(inTable);


    function getUniqueFields(allFields) {
      var used = {};

      var filtered = allFields.filter(field => {
        return field._id in used ? 0 : (used[field._id] = 1);
      });
      const existingRecords = inTable.map(item => item._id.toString());

      const recordsForWrite = filtered.filter(item => {
        if (existingRecords.includes(item._id.toString())) {
          return false
        }
        return true

      })
      return recordsForWrite;

    }
    const uniqueFields = getUniqueFields(allFields)

    localizationTEST.insertMany(uniqueFields, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    })
    res.send(uniqueFields).status(200)
  } catch (e) {
    throw new Error(e)
  }

  // res.render("index", {
  //   title: "Main page",
  //   isHome: true,
  // });
});

module.exports = router;
