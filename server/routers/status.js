const router = require('express').Router()
const Status = require('../models/status')
const isLogin = require('../middlewares/isLogin')

router.get('/', (req, res) => {
  Status.find()
  .populate({ 
    path: 'user',
    populate: {
      path: 'following',
      model: 'User'
    },
    populate: {
      path: 'followers',
      model: 'User'
    } 
  })
  .then(status => {
    res.status(200).json({
      message: 'get all status successfully',
      status
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

router.post('/', isLogin, (req, res) => {
  let input = {
    content: req.body.content,
    user: req.decoded.id
  }

  Status.create(input)
  .then(status => {
    res.status(201).json({
      message: 'create status successfully',
      status
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
})

module.exports = router