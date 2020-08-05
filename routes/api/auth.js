const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
// router.use(express.json())

const path = require('path');
const crypto = require('crypto');
const MongoClient = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const config = require('config');

// Mongo URI
const mongoURI = config.get('mongoURI');

// Create mongo connection
const conn = MongoClient.createConnection(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true  });

const User = require('../../models/User')
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, MongoClient.mongo);
  gfs.collection('zoo');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'zoo'
        };
        resolve(fileInfo);
      });
    });
  }
});


// @route POST api/users
// @desc Auth new user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if(!email || !password) {
    return res.status(400).json({msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({msg: 'We can\'t find an account with that email'})
      console.log(password, user.password)

      // Validate Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid Password'})

        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if(err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              }
            })
          }
        )
      })
    })
});


// @route GET api/auth/user
// @desc GET user data
// @access Private
router.get('/users', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})


module.exports = router;
