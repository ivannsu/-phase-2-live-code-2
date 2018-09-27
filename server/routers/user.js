const router = require('express').Router()
const User = require('../models/user')
const Status = require('../models/status')
const jwt = require('jsonwebtoken')
const crypt = require('../helpers/crypt')

router.post('/signup', (req, res) => {
  let input = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: crypt(req.body.password)
  }

  User.findOne({
    $or: [
      { 'username': input.username },
      { 'email': input.email }
    ]
  })
  .then(user => {
    if(!user) {
      User.create(input)
      .then(newUser => {
        res.status(201).json({
          message: 'success signup',
          user: newUser
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })

    } else {
      res.status(500).json({
        message: 'this email or username already registered'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

router.post('/signin', (req, res) => {
  let input = {
    acc: req.body.acc,
    password: crypt(req.body.password)
  }

  User.findOne({
    $or: [
      { 'username': input.acc },
      { 'email': input.acc }
    ],
    password: input.password
  })
  .then(user => {
    if(!user) {
      res.status(500).json({
        message: 'Username / Email or Password Wrong'
      });
    } else {
      let token = jwt.sign({ 
        id: user._id, 
        name: user.name, 
        username: user.username,
        email: user.email
      }, process.env.JWT_SECRET_KEY);

      res.status(200).json({
        message: 'success sign in',
        userId: user._id,
        token
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

router.get('/detail/:id', (req, res) => {
  let id = req.params.id

  User.findOne({ _id: id })
  .populate('following')
  .populate('followers')
  .then(user => {
    if(!user) {
      res.status(500).json({
        message: 'no user data'
      })
    } else {
      Status.count({ user: id })
      .then(totalStatus => {
        res.status(200).json({
          message: 'get user profile successfully',
          user, totalStatus
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })    
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

router.get('/suggestions/:id', (req, res) => {
  let exceptionId = req.params.id

  User.findRandom(
    { _id: { $ne: exceptionId } }, 
    {}, 
    { limit: 3 }, function(err, results) {
    if (!err) {
      res.status(200).json({
        message: 'get user suggestions',
        results
      })
    } else {
      res.status(500).json({
        message: err.message
      })
    }
  })
})

router.get('/recentfollow/:id', (req, res) => {
  let userId = req.params.id

  User.findOne({ _id: userId })
  .populate({ 
    path: 'following',
    model: 'User',
    options: { sort: { 'createdAt': -1 } }})
  .then(user => {
    res.status(200).json({
      message: 'get followers',
      user
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

router.post('/follow/:id', (req, res) => {
  let userId = req.params.id
  let followingId = req.body.followingId

  User.findOne({ _id: userId })
  .then(user => {
    User.updateOne({ _id: userId }, { 
      $push: { 
        following: followingId
      } 
    })
    .then(affected => {
      User.updateOne({ _id: followingId }, { 
        $push: { 
          followers: userId
        } 
      })
      .then(affected => {
        User.findOne({ _id: followingId })
        .then(hasFollowed => {
          res.status(200).json({
            message: 'follow successfully',
            userId, hasFollowed
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })  
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })  
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

module.exports = router