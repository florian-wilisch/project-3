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
            image: 'https://i.imgur.com/69AV8Kt.jpg',
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
            image: 'https://i.imgur.com/P6wgj4g.jpg',
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
          },
          {
            category: 'Farmers Market',
            name: 'Alton Farmers Market',
            timings: 'The second Saturday of every month 10am - 2pm',
            startDate: '',
            endDate: '',
            address: 'High Street, Alton',
            city: 'Alton',
            postcode: 'GU34 1AB',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/Rx0B0fS.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Petersfield Farmers Market',
            timings: 'First Sunday of the month 10am - 2pm',
            startDate: '',
            endDate: '',
            address: 'The Square, Petersfield',
            city: 'Petersfield',
            postcode: 'GU32 3HQ',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/mcQ5FSX.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Emsworth Farmers Market',
            timings: 'Third Saturday of each month 10am - 2pm',
            startDate: '',
            endDate: '',
            address: 'St Peters Square, Emsworth',
            city: 'Emsworth',
            postcode: 'PO10 7AG',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/uevt3lW.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Ringwood Farmers Market',
            timings: 'Held on the last Saturday of each month 10am - 2pm',
            startDate: '',
            endDate: '',
            address: 'The Furlong, Ringwood, Hampshire',
            city: 'Ringwood',
            postcode: 'BH24 1AH',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/pK83J4j.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Romsey Farmers Market',
            timings: 'First Sunday of every month  10am - 1pm',
            startDate: '',
            endDate: '',
            address: 'Alma Road Car Park (opposite Waitrose), Romsey',
            city: 'Romsey',
            postcode: 'SO51 8ED',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/kc22xdP.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Southsea Farmers Market',
            timings: 'Third Sunday of every month. 10am - 2pm',
            startDate: '',
            endDate: '',
            address: 'Palmerston Road, Southsea',
            city: 'Southsea',
            postcode: 'PO5 3QE',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/6IOOJ8a.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Winchester End of Month Farmers Market',
            timings: 'Last Sunday of every month 9am - 2pm',
            startDate: '',
            endDate: '',
            address: 'The Broadway, Winchester',
            city: 'Winchester',
            postcode: 'SO23 9BE',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/yihkmgM.jpg',
            user: users[0]
          },
          {
            category: 'Farmers Market',
            name: 'Winchester Mid Month Farmers Market',
            timings: 'Second Sunday of every month 9am - 2pm',
            startDate: '',
            endDate: '',
            address: 'The Broadway, Winchester',
            city: 'Winchester',
            postcode: 'SO23 9BE',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@hampshirefarmersmarkets.co.uk',
            phone: '',
            bio: '',
            image: 'https://i.imgur.com/kOdlsys.jpg',
            user: users[0]
          },
          {
            category: 'Farm Shop',
            name: 'Wellington Farm Shop',
            timings: 'Mon-Sat 8.30am to 5.30pm, Sun 8.30am to 4.00pm',
            startDate: '',
            endDate: '',
            address: 'Wellington Farm Shop, Hampshire',
            city: 'Wellington',
            postcode: 'RG27 0LT',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@wellingtonfarmshop.co.uk',
            phone: '',
            bio: 'Wellington Farm Shop opens daily and stocks a range of fresh meat such as lamb, pork, poultry, sausages and game. You ll find all of this as well as fruit and veg, local bread and fresh cakes.',
            image: 'https://i.imgur.com/xewOsUv.jpg',
            user: users[0]
          },
          {
            category: 'Farm Shop',
            name: 'Newlyns Farm Shop',
            timings: 'Monday - Friday 8:30am - 5:30pm, Saturday 8:00am - 3:00pm, Sunday 9:00am - 2:30pm',
            startDate: '',
            endDate: '',
            address: 'Lodge Farm North, Warnborough, Hampshire',
            city: 'Warnborough',
            postcode: 'RG29 1HA',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@newlyns.com',
            phone: '',
            bio: 'Newlyns stock their own home-produced meat as well as offering items such as fresh fruit and vegetables, not forgetting the delicatessen counters full of goodies',
            image: 'https://i.imgur.com/WnrmKZ3.jpg',
            user: users[0]
          },
          {
            category: 'Farm Shop',
            name: 'Durleighmarsh Farm Shop',
            timings: 'Mon-Sat 9.00am to 5.00pm, Sun 10.00am to 3.00pm',
            startDate: '',
            endDate: '',
            address: 'Rogate Road, Petersfield, Hampshire',
            city: 'Petersfield',
            postcode: 'GU31 5AX',
            longitude: '',
            latitude: '',
            website: '',
            email: 'shop@durleighmarshfarmshop.co.uk',
            phone: '',
            bio: 'As well as a good offering of local meat and dairy produce Durleighmarsh also grow their own fruit and vegetables which are all ready-picked in season.',
            image: 'https://i.imgur.com/WsocMnu.jpg',
            user: users[0]
          },
          {
            category: 'Farm Shop',
            name: 'Cobbs Farm Shop',
            timings: 'Mon-Sat 9.00am to 5.00pm, Sunday 10.00am to 4.00pm',
            startDate: '',
            endDate: '',
            address: 'Springvale Road, Headbourne Worthy, Winchester, Hampshire',
            city: 'Winchester',
            postcode: 'SO23 7LD',
            longitude: '',
            latitude: '',
            website: '',
            email: 'winchestershop@cobbsfarmshops.co.uk',
            phone: '',
            bio: 'With a farm shop, cafe and butchery on site, Cobbs certainly have all the bases covered when it comes to food and drink. Having been in the heart of the local community for more than thirty years they pride themselves in serving up quality food with provenance.',
            image: 'https://i.imgur.com/wN2NC27.jpg',
            user: users[0]
          },
          {
            category: 'Farm Shop',
            name: 'Beechcroft Farm Shop',
            timings: 'Click & Collect only',
            startDate: '',
            endDate: '',
            address: 'Crabwood, Sarum Road, Winchester, Hampshire',
            city: 'Winchester',
            postcode: 'SO22 5QS',
            longitude: '',
            latitude: '',
            website: '',
            email: 'info@beechcroftdirect.co.uk',
            bio: 'Winner of Best Farm Shop at the 2013 and 2014 Hampshire Life Food and Drink Awards, Beechcroft offer fresh cuts of lamb, beef and pork, as well as turkey at Christmas. All the animals are free range and left to slowly mature on Beechcrofts chalkland fields.',
            image: 'https://i.imgur.com/Ba11TwB.jpg',
            user: users[0]
          },
          {
            category: 'Zero Waste Shop',
            name: 'All Good Things',
            timings: 'Mon-Weds 9.30am to 4pm, Friday and Saturday 10.00am to 5pm',
            startDate: '',
            endDate: '',
            address: 'Wickham Community Centre, Mill Lane, Wickham, Hampshire',
            city: 'Wickham',
            postcode: 'PO17 5AL',
            longitude: '',
            latitude: '',
            website: '',
            email: 'hello@allgoodthingseco.co.uk',
            phone: '',
            bio: 'Whether you re new to reducing your environmental impact, or a hard-core eco warrior All Good Things is the perfect shop for you. We have packaging-free and zero waste alternatives for many of your regular household purchases.',
            image: 'https://i.imgur.com/adqEg7X.jpg',
            user: users[0]
          },
          {
            category: 'Zero Waste Shop',
            name: 'Earthian Zero Waste',
            timings: 'Tue-Fri 10.00am to 5.00pm, Sat 9.00am to 5.30pm, Sun 10.00am to 4.00pm',
            address: '9A Parchment St, Winchester',
            city: 'Winchester',
            postcode: 'SO23 8AT',
            longitude: '',
            latitude: '',
            website: '',
            email: 'hello@earthianzerowasteshop.co.uk',
            phone: '',
            bio: 'We specialise in plastic-free, organic and low waste products. You can bring your own containers to the store to stock up on food staples such as grains beans pasta and cereals.',
            image: 'https://i.imgur.com/iiFwGhe.jpg',
            user: users[0]
          },
          {
            category: 'Zero Waste Shop',
            name: 'Eco Freaks Emporium',
            timings: 'Mon, Tue, Thur & Friday – 10am to 12pm, Saturday 10:30am - 12:30pm',
            address: '14-16 South Street, Gosport',
            city: 'Gosport',
            postcode: 'PO12 1ES',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '02392 528 096',
            bio: 'We stock over 280 loose food products, plastic free and ethical our aim is to sell 95% Organic food by the end of 2020.',
            image: 'https://i.imgur.com/3w59U2S.jpg',
            user: users[0]
          },
          {
            category: 'Vegan Restaurant',
            name: 'ONeills Winchester',
            timings: 'Mon-Sat 9.00am to 9.00pm, Sun 10.00am to 6.00pm',
            address: '90-91 High Street, Winchester, Hampshire',
            city: 'Winchester',
            postcode: 'SO23 9AP',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '01962 844 001',
            bio: 'There is plenty to choose from on our vegan and vegetarian menu at ONeills Winchester. So, whether you are in for breakfast, a quick bite at lunchtime, or to share some tapas with your mates, we have got something delicious and nutritious especially for you.',
            image: 'https://i.imgur.com/Ce9Ddum.jpg',
            user: users[0]
          },
          {
            category: 'Vegan Restaurant',
            name: 'Offbeet',
            timings: 'Weds to Sun 11.00am to 5.00pm',
            address: 'Sunnyfields Farm, Jacobs Gutter Lane, Totten, Hampshire',
            city: 'Totten',
            postcode: 'SO40 9FX',
            longitude: '',
            latitude: '',
            website: '',
            email: 'southampton@offbeetfood.com',
            phone: '',
            bio: 'We take popular classic dishes, pull them apart, throw the rule book away and remodel those dishes into something new, exciting and mind blowing.',
            image: 'https://i.imgur.com/ySOWnOD.jpg',
            user: users[0]
          },
          {
            category: 'Charity Shop',
            name: 'British Heart Foundation',
            timings: 'Mon - Sat 9.00am to 5.30pm',
            address: '172 Fleet Road, Fleet, Hampshire',
            city: 'Fleet',
            postcode: 'GU51 4DA',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '01252 624891',
            bio: 'Our vision is a world free from the fear of heart and circulatory diseases. A world without heartbreak.',
            image: 'https://i.imgur.com/7u546Dh.png',
            user: users[0]
          },
          {
            category: 'Charity Shop',
            name: 'Blue Cross Charity Shop',
            timings: 'Mon - Sat 9.00am to 5.30pm',
            address: '187 Fleet Road, Fleet, Hampshire',
            city: 'Fleet',
            postcode: 'GU51 4DA',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '0300 777 1635',
            bio: 'Our charity shops sell a mixture of donated clothes, books, toys, household goods and soft furnishings.',
            image: 'https://i.imgur.com/txf5p0t.jpg',
            user: users[0]
          },
          {
            category: 'Cycling Shop',
            name: 'Pedal Heaven',
            timings: 'Mon - Sat 9.00am to 5.30pm, Sun 10.00am to 4.00pm',
            address: '311 Fleet Rd, Fleet, Hampshire',
            city: 'Fleet',
            postcode: 'GU51 3BU',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '01252 628 575',
            bio: 'Welcome to Pedal Heaven. Hampshire s most innovative and modern bicycle experience destination.',
            image: 'https://i.imgur.com/3TmbWIW.jpg',
            user: users[0]
          },
          {
            category: 'Cycling Shop',
            name: 'East Street Cycles',
            timings: 'Mon - Sat 9.00am to 5.30pm, Sun 10.00am to 4.00pm',
            address: 'Seven Stars House, 88 East St, Farnham, Surrey',
            postcode: 'GU9 7TP',
            city: 'Farnham',
            longitude: '',
            latitude: '',
            website: '',
            email: '',
            phone: '01252 723888',
            bio: 'East Street Cycles journey began long before our doors opened in the Summer of 2004. At the start it was myself and one full time employee and a bit of a rota on Saturdays cajoling friends into helping out…',
            image: 'https://i.imgur.com/sGUpWhd.jpg',
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