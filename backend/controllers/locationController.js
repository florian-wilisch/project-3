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

//  Create a comment

function createComment(req, res) {

  const comment = req.body

  comment.user = req.currentUser


  Locations
    .findById(req.params.locationId)
    .populate('comments.user')
    .then(location => {
      if (!location) return res.status(404).send({ message: 'Not found' })

      location.comments.push(comment)

      return location.save()
    })
    .then(location => res.send(location))
    .catch(err => res.send(err))
}

// Get single comment

function getComment(req, res) {

  Locations
    .findById(req.params.locationId)
    .populate('comments.user')
    .then(location => {
      const comment = location.comments[req.params.commentIndex]
      res.send(comment)
    })
    .catch(error => res.send(error))


}

//  Update a comment

function updateComment(req, res) {

  Locations
    .findById(req.params.locationId)
    .populate('comments.user')
    .then(location => {

      if (!location) return res.status(404).send({ message: 'Not found' })

      const comment = location.comments.id(req.params.commentId)

      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      comment.set(req.body)
      return location.save()
    })
    .then(location => res.send(location))
    .catch(err => res.send(err))
}

//  Delete a comment

function deleteComment(req, res) {

  Locations
    .findById(req.params.locationId)
    .populate('comments.user')
    .then(location => {

      if (!location) return res.status(404).send({ message: 'Not found' })

      const comment = location.comments.id(req.params.commentId)

      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      comment.remove()

      return location.save()
    })
    .then(location => res.send(location))
    .catch(err => res.send(err))
}

//  Export the functions

module.exports = {
  getLocations,
  singleLocation,
  addLocation,
  updateLocation,
  removeLocation,
  createComment,
  updateComment,
  deleteComment,
  getComment
}
