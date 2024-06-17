const express = require('express');
const DB = require("../models/mongo/");
const Courses = DB.courses;
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.post("/create", async (req, res) => {
//   try {
//     const users = await Courses.find( { lineid: req.body.lineid } );
//     if(users.length > 0){
//       res.status(401).json("User Already Exists");
//     }else{
//       const newUser = new Users({
//           lineid: req.body.lineid,
//           displayname : req.body.displayname,
//           timestamp: new Date(),
//           createddate : new Date(),
//       });
//       await newUser.save();
//       const data = {
//         lineid: req.body.lineid
//       }
//       // create session
//       res.status(200).json(data);
//     }
//   }catch (err) {
//     res.send(err);
//   }
// });




module.exports = router;
