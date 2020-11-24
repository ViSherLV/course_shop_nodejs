const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const keys = require('../keys');


router.get("/", async (req, res) => {
  try {
    console.log(`in get`)
    const languagesSchema = new Schema({
      code: String,
      text: String,
    },{ _id : false });

    const regionSchema = new Schema({
      code: String,
      text: String,
    },{ _id : false });

    const schema = new Schema({
      languages: [languagesSchema],
      regionCode: [regionSchema],
    });

    const INPUT_SERVER_URL = 'mongodb+srv://Rake_System_TEST:Aj01D1dG6XPXdAIY@test-swnqr.gcp.mongodb.net/Rake-System-TEST';
    const OUTPUT_SERVER_URL = 'mongodb+srv://Rake_System_UAT:HWAaE9yb6SWMgppY@uat-2arol.gcp.mongodb.net/Rake-System-UAT';
    //   const OUTPUT_SERVER_URL ='mongodb+srv://Rake_System_TEST:Aj01D1dG6XPXdAIY@test-swnqr.gcp.mongodb.net/Rake-System-TEST'
    //  const INPUT_SERVER_URL = 'mongodb+srv://Rake_System_TEST:Aj01D1dG6XPXdAIY@test-swnqr.gcp.mongodb.net/Rake-System-TEST'
     const COLLECTION_NAME_OUTPTUT = 'localizations_3'
     const COLLECTION_NAME_IPTUT = 'localizations'

     const inputServer = await mongoose.createConnection(INPUT_SERVER_URL, {
       useNewUrlParser: true,
       useFindAndModify: false,
     });
     const outputServer = await mongoose.createConnection(OUTPUT_SERVER_URL, {
       useNewUrlParser: true,
       useFindAndModify: false,
     });

     let outDB = outputServer.model(COLLECTION_NAME_OUTPTUT, schema);
     const inDB = inputServer.model(COLLECTION_NAME_IPTUT, schema);
    //  const outTable = await outDB.find({})
    //  const inTable = await inDB.find({});
    //5fbd741a9ed0bf0494087f12
    const testDB =  inputServer.model(COLLECTION_NAME_IPTUT, schema);

    const uatDB = outputServer.model(COLLECTION_NAME_OUTPTUT, schema);
    const dataFromTest = await testDB.find({})
    const dataFromUAT = await uatDB.find({})
    // const allFields = outTable.concat(inTable);


//     const arrayWithRu = [
//       {
//       _id: "5f7b419849979b3a7c9f9af1",
//       languages: [
//           {
//               code: "uk",
//               text: "dzen"
//           },
//           {
//               code: "en",
//               text: "Plan"
//           },
//           {
//             code: "ru",
//             text: "koka"
//         }
//       ],
//       regionCode: [],
//       __v: 0
//   },
//   {
//     _id: "5f7b419849979b3a7c9f9af2",
//     languages: [
//         {
//             code: "en",
//             text: "kaka"
//         },
//         {
//           code: "ru",
//           text: "Plandushi"
//       }
//     ],
//     regionCode: [],
//     __v: 0
// },
//   ]
//   const arrayWithUa = [
//     {
//     _id: "5f7b419849979b3a7c9f9af1",
//     languages: [
//         {
//             code: "uk",
//             text: "Плані"
//         },
//         {
//             code: "en",
//             text: "Plan"
//         },
//         {
//           code: "ru",
//           text: "Plan"
//       }
//     ],
//     regionCode: [],
//     __v: 0
// },
// {
//   _id: "5f7b419849979b3a7c9f9af2",
//   languages: [
//       {
//           code: "en",
//           text: "Plan"
//       },
//       {
//         code: "uk",
//         text: "Планє"
//     }
//   ],
//   regionCode: [],
//   __v: 0
// },
// ]
let newRusTexts = []
let ukrItemWithRus = []
let ukrItemId;
let ruItem;
let ruItemId;
let newItem;
let newLanguagesBase = [];
//FROM UAT TO TES RU=>>>RU UPDATE
// dataFromUAT.forEach(function(item,index){
//   let ukrOject = dataFromTest.find(record => record._id.toString() === item._id.toString())
//  // console.log(`ukrOject`, JSON.stringify(ukrOject));
//   let ruLangInRu = item.languages.findIndex(language => language.code.toString() === 'ru');
//   let ruLangInUa = ukrOject.languages.findIndex(language => language.code.toString() === 'ru');
//  // console.log(`ruLangInRu ${JSON.stringify(ruLangInRu)}`)
//  // console.log(`ruLangInUa ${JSON.stringify(ruLangInUa)}`)
//   if(ruLangInRu!==-1&&ruLangInUa!==-1){
//     ukrOject.languages[ruLangInRu] = item.languages[ruLangInRu];
//     newLanguagesBase.push(ukrOject)
    
//   }else if(ruLangInRu!==-1&& ruLangInUa ===-1){
//     const ukranianLanguages = JSON.parse(JSON.stringify(ukrOject));
//  //   console.log(`ukranianLanguages ${JSON.stringify(ukranianLanguages)}`)
//     ukranianLanguages.languages.push(item.languages[ruLangInRu]);
//     newLanguagesBase.push(ukranianLanguages)
//   }else{
//     const ukranianLanguages = JSON.parse(JSON.stringify(item));
//     newLanguagesBase.push(ukranianLanguages)
//   }

// });

//FROM TESTDB TO UAT UK=>>>UK UPDATE

// dataFromTest.forEach(function(testRecord,index){
//   //console.log(`dataFromUAT`, dataFromUAT)
//   let uatRecord = dataFromUAT.find(record => record._id.toString() === testRecord._id.toString())
// //  console.log(`ruOject`, JSON.stringify(ruOject));
//   let ukLangInTest = testRecord.languages.findIndex(language => language.code.toString() === 'uk');
//   let ukLangInUAT = uatRecord.languages.findIndex(language => language.code.toString() === 'uk');
//   //  console.log(`---------------==================================================================`)
//   //  console.log(`ukLangInTest ${JSON.stringify(ukLangInTest)}`)
//   //  console.log(`ukLangInUAT ${JSON.stringify(ukLangInUAT)}`)
//   if(ukLangInUAT!=-1&&ukLangInTest!=-1){
// //    console.log(`ukLangInUAT&&ukLangInTest`)
// uatRecord.languages[ukLangInUAT] = testRecord.languages[ukLangInTest];
// //    console.log(`ruOject, ${JSON.stringify(ruOject)}`)
//     newLanguagesBase.push(uatRecord)
    
//   }else if(ukLangInUAT===-1&& ukLangInTest!==-1){
//     const languagesArray = JSON.parse(JSON.stringify(uatRecord));
// //    console.log(`ukranianLanguages ${JSON.stringify(ukranianLanguages)}`)
//       languagesArray.languages.push(testRecord.languages[ukLangInTest]);
//     newLanguagesBase.push(languagesArray)
//   }

//  });

//update TEST FOR RU1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const error = []
dataFromUAT.forEach(function(uatRecord,index){ 
  //console.log(`dataFromUAT`, dataFromUAT)
  let testRecord = dataFromTest.find(record => record._id.toString() === uatRecord._id.toString())
//  console.log(`ruOject`, JSON.stringify(ruOject));
if(testRecord&&uatRecord){

  let ruLangInTest = testRecord.languages.findIndex(language => language.code.toString() === 'ru');
  let ruLangInUAT = uatRecord.languages.findIndex(language => language.code.toString() === 'ru');
  //  console.log(`---------------==================================================================`)
  //  console.log(`ukLangInTest ${JSON.stringify(ukLangInTest)}`)
  //  console.log(`ukLangInUAT ${JSON.stringify(ukLangInUAT)}`)
  if(ruLangInUAT!=-1&&ruLangInTest!=-1){
//    console.log(`ukLangInUAT&&ukLangInTest`)

testRecord.languages[ruLangInTest] = uatRecord.languages[ruLangInUAT];
//    console.log(`ruOject, ${JSON.stringify(ruOject)}`)
    newLanguagesBase.push(testRecord)
    
  }else if(ruLangInTest===-1&& ruLangInUAT!==-1){
    const languagesArray = JSON.parse(JSON.stringify(testRecord));
//    console.log(`ukranianLanguages ${JSON.stringify(ukranianLanguages)}`)
      languagesArray.languages.push(uatRecord.languages[ruLangInUAT]);
    newLanguagesBase.push(languagesArray)
  }

}else{
  error.push({testRecord,uatRecord })
}

 });
 console.log(`errors`, JSON.stringify(error))
// console.log(`newLanguagesBase${JSON.stringify(newLanguagesBase)}`)
// arrayWithRu.forEach(function(rusItem){
//   ruItemId = rusItem._id;
//   ruItem = rusItem;
//   arrayWithUa.forEach(function(uaItem){
//     ukrItemId = uaItem.id;
//     if(rusItem._id===uaItem._id){
//       newItem = uaItem;
//       console.log(`newItem ${JSON.stringify(newItem)}`)
//       newItem.languages.forEach(function(uaLang,i){
//           if(uaLang.code === 'ru'){
//             rusItem.languages.forEach(function(RuLang){
//               if(RuLang.code === 'ru'){
//                 console.log(`uaLang ${uaLang.text}`)
//                 console.log(`RuLang ${RuLang.text}`)
//                 uaLang = RuLang;
                
//                 newItem.languages[i] = RuLang
//               }
//             })
              
//             }else{
//               rusItem.languages.forEach(function(RuLang){
//                 if(RuLang.code === 'ru'){
//                   console.log(`uaLang1 ${uaLang.text}`)
//                   console.log(`RuLang1 ${RuLang.text}`)
//                   ukrItemWithRus = newItem
//                   ukrItemWithRus.languages.push = RuLang
//                   console.log(`ukrItemWithRus, ${JSON.stringify(ukrItemWithRus)}`)
//                 }
//               })
//             }
//           }
          
//       )
//       console.log(`newItem, ${JSON.stringify(newItem)}`)
//       newRusTexts.push(newItem)
//       }

//   })

// })
// arrayWithRu.forEach(element => {
//   let ruObj = false;
//   element.languages.forEach(function(ruItem){
//     if(ruItem.code ==='ru'){
//       ruObj = ruItem
//     }
//   })
//   let currentUaText;
//   arrayWithUa.forEach(function(itemUa){
//     if(itemUa._id === element._id){
//       currentUaText = itemUa;
//     }
//   })
//   currentUaText.languages.forEach(function(item,i){
    
//     if(item.code==='ru'&& ruObj){
//       //item = ruObj;
//       item.ru = ruObj;
//       newRusTexts.push(currentUaText)
      
//     }else{
//       newRusTexts.push(currentUaText)
//     }
    
//   })
  // });

    // function getUniqueFields(allFields) {
    //   var used = {};

    //   var filtered = allFields.filter(field => {
    //     return field._id in used ? 0 : (used[field._id] = 1);
    //   });
    //   const existingRecords = inTable.map(item => item._id.toString());

    //   const recordsForWrite = filtered.filter(item => {
    //     if (existingRecords.includes(item._id.toString())) {
    //       return false
    //     }
    //     return true

    //   })
    //   return recordsForWrite;

    // }
    // const uniqueFields = getUniqueFields(allFields)

    // inDB.insertMany(uniqueFields, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(result);
    //   }
    // })
    
      for (elemt of newLanguagesBase){
        testDB.findByIdAndUpdate(elemt._id, {$set: {languages: elemt.languages}}, function(err, doc) {
          
      });
      }
    res.send(newLanguagesBase).status(200)
  } catch (e) {
    throw new Error(e)
  }

  // res.render("index", {
  //   title: "Main page",
  //   isHome: true,
  // });
});

module.exports = router;
