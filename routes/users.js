const express = require('express');
const DB = require("../models/mongo/");
const Users = DB.users;
const Childs = DB.childs;
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/list", async (req, res) => {

  //const { sql , count_sql , email , projectname , count } = req.body;
  //const { projectID } = req.params;

  //get session (lineid)
  
  // try {
  //   const users = await Users.find( { lineid: req.body.lineid } );
  //   if(users.length > 0){
  //     res.status(401).json("User Already Exists");
  //   }else{
  //     const newUser = new Users({
  //         lineid: req.body.lineid,
  //         timestamp: new Date(),
  //     });
  //     await newUser.save();
  //     const data = {
  //       lineid: req.body.lineid
  //     }
  //     res.status(200).json(data);
  //   }
  // }catch (err) {
  //   res.send(err);
  // }

});


router.get("/checktoken", (req, res, next) => {
  try {
    let { linetoken } = req.headers;
    console.log(linetoken)
    res.status(200).json(linetoken);
  } catch (error) {
    return res.status(400).json(`Error : ${error.message}`);
  }
});

// check user exists
// create session or token (lineid)

router.post("/create", async (req, res) => {
  try {
    const users = await Users.find( { lineid: req.body.lineid } );
    if(users.length > 0){
      res.status(401).json("User Already Exists");
    }else{
      const newUser = new Users({
          lineid: req.body.lineid,
          displayname : req.body.displayname,
          timestamp: new Date(),
          createddate : new Date(),
      });
      await newUser.save();
      const data = {
        lineid: req.body.lineid
      }
      // create session
      res.status(200).json(data);
    }
  }catch (err) {
    res.send(err);
  }
});


router.post("/child-create", async (req, res) => {
  try {
    
    const users = await Childs.find( { lineid: req.body.lineid } );

    const newChild = new Childs({
      parent_id : req.body.lineid,
      fullname  : req.body.fullname,
      nickname  : req.body.nickname,
      dob       : req.body.dob,
      created_date : new Date()
    });
    await newChild.save();

    const data = {
      id : newChild._id,
      parent_id : req.body.lineid,
      fullname  : req.body.fullname,
      nickname  : req.body.nickname,
      dob       : req.body.dob,
      created_date : new Date()
    }  

    // create session
    res.status(200).json(data);
    
  }catch (err) {
    res.send(err);
  }
});



router.get('/child-find/:id',  async (req, res) => {

  const { id } = req.params;
  var o_id = new ObjectId(id);

  const users = await Childs.find( { _id: o_id } );
  console.log(users);

  try {
    res.send({
      status: 200,
      msg: "Successfully",
      data: users
    });
  }catch (err) {
    res.send(err);
  }
  //res.json(books.find(book => book.id === req.params.id))
})


module.exports = router;
