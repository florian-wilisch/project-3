const { default: Axios } = require('axios')
const Locations = require('../models/locations')
const axios = require('axios')


function getLocations(req, res) {
  Locations
    .find()
    // ! This is going to 'fill in' the fields of my user
    .populate('user')
    .then(locationList => {
      res.send(locationList)
    })
    .catch(error => res.send(error))
}

module.exports = {
  getLocations
}