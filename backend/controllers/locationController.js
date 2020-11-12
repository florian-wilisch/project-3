const { findById } = require('../models/locations')
const Locations = require('../models/locations')


// Get all locations

function getLocations(req, res) {
  Locations
    .find()
    .populate('user')
    .then(locationList => {
      res.send(locationList)
    })
    .catch(error => res.send(error))
}


// Get a single location

function singleLocation(req, res) {

  Locations
    .findById(req.params.locationId)
    .populate('comments.user')
    .then(location => {
      res.send(location)
    })
    .catch(error => res.send(error))

}

//  Add a new location

function addLocation(req, res) {

  req.body.user = req.currentUser

  Locations
    .create(req.body)
    .then(location => {
      res.send(location)
    })
    .catch(error => res.send(error))

}

//  Update a location

function updateLocation(req, res) {
  const body = req.body
  const currentUser = req.currentUser

  Locations
    .findById(req.params.locationId)
    .then(location => {
      if (!location) return res.send({ message: 'No location found!' })

      if (!location.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      location.set(body)
      location.save()
      res.send(location)
    })
    .catch(error => res.send(error))
}

//  Remove a location

function removeLocation(req, res) {
  const currentUser = req.currentUser

  Locations
    .findById(req.params.locationId)
    .then(location => {
      if (!req.currentUser.isAdmin && !location.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      location.deleteOne()
      res.send(location)
    })
    .catch(error => res.send(error))
}

//  Export the functions

module.exports = {
  getLocations,
  singleLocation,
  addLocation,
  updateLocation,
  removeLocation
}
