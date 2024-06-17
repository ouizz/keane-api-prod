var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'API' });
});

app.get('/:id', (req, res) => {
  res.send({
    status: 200,
    msg: "Successfully",
    data: {
      firstname : 'weera'
      // accountname: req.body.accountname,
      // role: req.body.role,
      // status: req.body.status
    }
  });
  //res.json(books.find(book => book.id === req.params.id))
})

module.exports = app;
