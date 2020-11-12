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

//  Export the functions

module.exports = {
  getLocations,
  singleLocation
}
