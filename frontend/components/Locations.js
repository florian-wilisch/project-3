import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// The API is at '/api/locations' 

const Locations = () => {
  const [locationData, updateLocationData] = useState([])
  const [locationFilter, updateLocationFilter] = useState('')
  const [selectedCategory, updateSelectedCategory] = useState('')

  useEffect(() => {
    axios.get('/api/locations')
      .then(axiosResp => {
        updateLocationData(axiosResp.data)
      })
  }, [])
<<<<<<< HEAD

  function filterLocations() {
    const filteredLocations = locationData.filter(location => {
      const name = location.name.toLowerCase()
      const filterText = locationFilter.toLowerCase()
      return name.includes(filterText)
        && (selectedCategory === '' || location.category[0] === selectedCategory)
    })
    return filteredLocations
  }

  function getCategories() {
    const mappedCategories = locationData.map(location => location.category[0])
    const uniqueCategories = new Set(mappedCategories)
    const arrayLocations = Array.from(uniqueCategories)
    console.log(mappedCategories)
    console.log(uniqueCategories)
    console.log(arrayLocations)
    return arrayLocations
  }

  return <div className="section">
=======
  return <section className="section">
>>>>>>> development
    <div className="container">
      <input
        className="input"
        placeholder="Search..."
        onChange={(event) => updateLocationFilter(event.target.value)}
        value={locationFilter}
      />
      <div className="buttons">
        {getCategories().map(category => {
          return <button
            onClick={(event) => updateSelectedCategory(event.target.innerHTML) }
            className="button"
          >
            {category}
          </button>
        })}
      </div>
      <div className="columns is-multiline is-mobile">
<<<<<<< HEAD
        {filterLocations().map((location, index) => {
          console.log(location)
          return <div
            className="column is-one-third-desktop is-half-tablet is-half-mobile"
            key={index}
          >
=======
        {locationData.map((location, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
>>>>>>> development
            <Link to={`/locations/${location._id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{location.name}</p>
                      <p className="subtitle is-6">{'Category: ' + location.category}</p>
                      <p className="subtitle is-6">{'Address: ' + location.address}</p>
                      <p className="subtitle is-6">{'Postcode: ' + location.postcode}</p>
                      <p className="subtitle is-6">{'Timings: ' + location.timings}</p>
                      <p className="subtitle is-6">{'Event starts: ' + location.startDate}</p>
                      <p className="subtitle is-6">{'Event ends: ' + location.endDate}</p>
                      <p className="subtitle is-6">{'Website: ' + location.website}</p>
                      <p className="subtitle is-6">{'Email: ' + location.email}</p>
                      <p className="subtitle is-6">{'Phone: ' + location.phone}</p>
                      <p className="subtitle is-6">{'About: ' + location.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={location.image} alt={location.name} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </div>
  </div>
}

export default Locations 