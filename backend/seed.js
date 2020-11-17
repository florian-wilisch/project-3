const mongoose = require('mongoose')
const Locations = require('./models/locations')
const User = require('./models/user')
const seedData = require('./seedData')

mongoose.connect(
  'mongodb://localhost/greenWorldDb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)

    console.log('Mongoose connected!')
    mongoose.connection.db.dropDatabase() // ! reset the data, remove whats there
      .then(() => {
        return User.create([
          {
            username: 'flow',
            email: 'flow@flow.com',
            password: 'flow',
            passwordConfirmation: 'flow',
            isAdmin: true,
            bio: '',
            city: '',
            avatar: ''
          },
          {
            username: 'balta',
            email: 'balta@balta.com',
            password: 'balta',
            passwordConfirmation: 'balta',
            isAdmin: true,
            bio: 'I am a web developer',
            city: 'london',
            avatar: 'https://pbs.twimg.com/profile_images/2624763257/lz5pautt5yimot9nwqow.png'
          }
        ])
      })
      .then(users => {
        console.log(`${users.length} users have been created!`)
        return users
      })
      // ! Chaining a second then, once the users have been created
      .then((users) => {
        return Locations.create(
          seedData
        )
      })
      .then(location => {
        location.modifiedPaths()
      })
      .then(location => {
        console.log(`${location.length} locations have been created!`)
      })
      .catch(err => {
        console.log(err)
      })
      // ! Closes the connection to mongodb once we're done.
      .finally(() => {
        mongoose.connection.close()
      })
  }
)