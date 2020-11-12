const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function createUser(req, res) {
  const body = req.body
  console.log(body)
  User
    .create(body)
    .then(user => {
      console.log(user)
      res.send(user)
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
}

function loginUser(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Email unknown!' })
      }
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized: Password doesn\'t match email' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '6h' }
      )
      res.status(202).send({ token, message: 'Login was succesful!' })
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })
}

module.exports = {
  createUser,
  loginUser
}