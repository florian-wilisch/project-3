const mongoose = require('mongoose')
const Locations = require('./models/locations')
const User = require('./models/user')

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
            isAdmin: true
          }
        ])
      })
      .then(users => {
        console.log(`${users.length} users have been created!`)
        return users
      })
      // ! Chaining a second then, once the users have been created
      .then((users) => {
        return Locations.create([          
          {
            category: ['Zero Waste Shop'],
            name: 'Dash Vegan',
            timings: 'Tues-Fri 12-6pm | Sat 10-6pm | Sun 12-5pm',
            startDate: '',
            endDate: '',
            address: 'First Floor, Hopkinson Art, Vintage & Antiques Store, 21 Station Street, Nottingham',
            city: 'Nottingham',
            postcode: 'NG2 3AJ',
            longitude: '',
            latitude: '',
            website: 'https://www.dashvegan.co.uk/',
            email: 'Hellodashvegan@gmail.com',
            phone: '07958 365155',
            bio: 'We are a vegan food delivery service providing great quality and wholesome vegan, gluten free food and plastic free options in Nottingham and the surrounding area through VDelivery and throughout the UK on this site.',
            image: 'https://www.dashvegan.co.uk/wp-content/uploads/2018/03/Dash-Vegan-logo-upper-padding.png',
            user: users[0]
          },
          {
            category: ['Zero Waste Shop'],
            name: 'Shop Zero',
            timings: 'THURSDAYS , FRIDAYS , SATURDAYS & MONDAYS : 12-3PM',
            startDate: '',
            endDate: '',
            address: `Shop Zero, Front Shop, Malt Cross, 16 St James Street, Nottingham`,
            city: 'Nottingham',
            postcode: 'NG1 6FG',
            longitude: '',
            latitude: '',
            website: 'https://shopzero.co.uk/',
            email: 'sarah@shopzero.co.uk',
            phone: '',
            bio: 'We are here to help you shop more consciously and reduce your environmental impact. Bring your own containers for bulk, unpackaged food, lower impact personal care, on the-go items, sustainable household goods and gifts.',
            image: '',
            user: users[0]
          },
          {
            category: ['Zero Waste Shop'],
            name: 'Want not Waste',
            timings: 'Mon - Fri : 10am - 5pm, Saturday: 10am - 6pm',
            startDate: '',
            endDate: '',
            address: 'University of Manchester Students Union, Oxford Road, Manchester',
            city: 'Manchester',
            postcode: 'M13 9PR',
            longitude: '',
            latitude: '',
            website: 'https://www.facebook.com/wantnotwastemcr/',
            email: '',
            phone: '07739545345',
            bio: 'Want Not Waste is a purely student-run business operating inside the Students Union, promoting not just sustainable goods but a sustainable way of life, with a programme of events including cooking demos, workshops, and talks on sustainable eating. We are a plastic-free shop selling healthy and sustainable products with low environmental impact. Customers may bring their own containers to fill with our products, including wine, dried goods, oils and vinegars, cleaning products, and much more.',
            image: 'https://www.thezerowastenetwork.com/logos/profile/limage-188-351-photo.png',
            user: users[0]
          },
          {
            category: ['Zero Waste Shop'],
            name: 'By The Gram',
            timings: 'Mon-Closed, Tues-Closed, Wed-9.30am-5.00pm, Thur -9.30am-5.00pm, Fri -9.30am -5 .00pm, Sat -10.00am-5.00pm, Sun -10.00am-4.00pm',
            startDate: '',
            endDate: '',
            address: 'Unit 5 Kershaw s Garden Centre, Halifax Road, Brighouse',
            city: 'Leeds',
            postcode: 'HD6 2QD',
            longitude: '',
            latitude: '',
            website: 'http://www.bythegramuk.com/',
            email: '',
            phone: '07913318832',
            bio: 'We are a single use plastic free zero waste shop. You can buy as much or as little as you need and you only pay by weight for the loose items and refills. We stock a range of products from whole foods to refill liquids to personal household items.',
            image: '',
            user: users[0]
          },
          {
            category: ['Zero Waste Shop'],
            name: 'The Hoylake Pantry',
            timings: 'Open Tuesday to Saturday from 10am to 5pm',
            startDate: '',
            endDate: '',
            address: '	4 Albert Rd, Hoylake, England, United Kingdom',
            city: 'Liverpool',
            postcode: 'CH47 2AB',
            longitude: '',
            latitude: '',
            website: 'http://www.hoylakezerowaste.co.uk/',
            email: '',
            phone: '07792502180',
            bio: '',
            image: 'https://www.thezerowastenetwork.com/pictures/profile/pimage-185-469-photo.jpg',
            user: users[0]
          },
          {
            category: ['Zero Waste Shop'],
            name: 'Ernie s Zero Waste Shop',
            timings: 'Sunday - Closed, Monday - Closed, Tuesday - 10 - 6.30, Wednesday - 10 - 5.30, Thursday - 10 - 7, Friday - 10 - 5.30, Saturday - 9.30 - 5',
            startDate: '',
            endDate: '',
            address: '137 Magdalen St, Norwich, England',
            city: 'Norwich',
            postcode: 'NR3 1NF',
            longitude: '',
            latitude: '',
            website: 'http://www.ethicalernie.co.uk/',
            email: '',
            phone: '',
            bio: 'We are a zero waste shop based in North Norwich. We sell a wide range of dried goods including nuts, pasta, lentils, quinoa, peas, beans, herbs, spices and seeds amongst others. We also have a range of oils and vinegars and a milk machine where you can make your own delicious nut milks. We also have a wide range of bathroom and household products including shampoo, soaps, bamboo cotton buds, toothpaste, toothbrushes etc. In addition we have a large refill station for household cleaning items and shampoo/conditioner. We currently stock bio and non bio laundry liquid, fabric conditioner, toilet cleaner, all purpose cleaner, glass cleaner, washing up liquid, cream cleaner, hand soap and white vinegar.',
            image: '',
            user: users[0]
          }
          
        ])
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