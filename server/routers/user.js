const router = require('express').Router()
const User = require('../models/user')
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

module.exports = router