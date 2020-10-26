const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const keys = require('../keys');

// const localizationsSchema = new Schema({
//   name: String
// });

const languagesSchema = new Schema({
  code: String,
  text: String,
});

const regionSchema = new Schema({
  code: String,
  text: String,
});

const localizationsSchema = new Schema({
  languages: [languagesSchema],
  regionCode: [regionSchema],
});

router.get("/", async (req, res) => {
try{
  const testDB = await mongoose.createConnection('mongodb+srv://Rake_System_TEST:Aj01D1dG6XPXdAIY@test-swnqr.gcp.mongodb.net/Rake-System-TEST', {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  const uatDB = await mongoose.createConnection('mongodb+srv://Rake_System_UAT:HWAaE9yb6SWMgppY@uat-2arol.gcp.mongodb.net/Rake-System-PROD', {
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  let localizationUAT = uatDB.model('localizations', localizationsSchema);
  const localizationTEST = testDB.model('localizations', localizationsSchema);
  const localization1 = testDB.model('localizations1', localizationsSchema)
  const local_test_back = testDB.model('localizations_26.10.2020',localizationsSchema )
  const uatResult = await localizationUAT.find({})
  const testResult = await localizationTEST.find({});
  

 //const unique= uatResult.concat(testResult.filter(({_id}) => !ids.includes(_id)))
 const unique = uatResult.concat(testResult);

//  let unique = result.filter(function(elem, index, self) {
//   return index === self.indexOf(elem);
// })


var used = {};
var filtered = unique.filter(function(obj) {
    return obj._id in used ? 0:(used[obj._id]=1);
});
const ids = testResult.map(item=>item._id.toString());
console.log(`ids`, ids)
filtered.forEach(function(item){

})
  // var elements = unique.reduce(function(previous, current) {

  //   var object = previous.filter(object => object.timestamp === current.timestamp);
  //   if (object.length == 0) {
  //     previous.push(current);
  //   }
  //   return previous;
  // }, []);
  // localizationTEST.insertMany(filtered, function(err, result){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(result);
  //   }
  // })
  console.log(`filtered,`, filtered)
const id = '5e9d65f83b27d53ae85df928';
  const filtered2 = filtered.filter(function(item,index,array){
       if(ids.includes(item._id.toString())){
        return false 
       }
       return true
 
  })
  console.log('uatDBlength', uatResult.length)
  console.log('testDBlenth', testResult.length)
  res.send(filtered2).status(200)
}catch(e){

throw new Error(e)
}

  // res.render("index", {
  //   title: "Main page",
  //   isHome: true,
  // });
});

module.exports = router;
