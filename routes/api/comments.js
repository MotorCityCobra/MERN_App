const express = require('express');
const router = express.Router();
const MongoClient = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken')

// Load User model
const Comment = require('../../models/Comment');

// DB Config
const mongoURI = config.get('mongoURI');

// Connect to MongoDB
MongoClient.Promise = global.Promise;
MongoClient.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true })
  
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));


router.get('/comments', (req, res) => {
  //var query = req.params.query;
  Comment.find({},(err,docs)=>{
    if (docs) {
    res.status(200).json(docs)
    } else {
      return res.json(err)
    }
  })
})

router.get('/comments/:filename', (req, res) => {
  Comment.find({page: req.params.filename
    }, (err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.json(files);
      } else if (files) {
        return res.json(files);
      }  else {
        return res.json(err);
      }
    }
  );
});

router.delete('/comments/all/:filename', (req, res) => {
  Comment.deleteMany({page: req.params.filename
  }, (err, files) => {
    // Check if files
    if (err) {return res.json(err);
    }
    res.status(200).json({ success: true });

  }
  )
})

// @route POST /upload
// @desc  Uploads file to DB
router.post('/comment/upload/', (req, res) => {
  var myData = new Comment(req.body);
  myData.save()
      .then(item => {
          res.json(myData);
      })
      .catch(err => {
          res.status(400).send("Unable to save to comment. Please try again.");
      });
});

module.exports = router;
