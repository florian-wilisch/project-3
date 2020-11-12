const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true }
}, {
  timestamps: true
})

const locationSchema = new mongoose.Schema({
  category: {
    type: [String],
    required: true,
    validate: (typesArray) => Array.isArray(typesArray) && typesArray.length > 0
  },
  name: { type: String, required: true },
  timings: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  longitude: { type: String, required: false },
  latitude: { type: String, required: false },
  website: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: Number, required: false },
  bio: { type: String, required: false },
  image: { type: String, required: false },
  comments: [ commentSchema ]
})

locationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Locations', locationSchema)