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
    <div className="container">
      <input
        className="locationsSearchBar"
        placeholder="Search..."
        onChange={(event) => updateLocationFilter(event.target.value)}
        value={locationFilter}
      />
      <div className="buttons">
        {getCategories().map((category, index) => {
          return <button
            key={index}
            onClick={(event) => updateSelectedCategory(event.target.innerHTML)}
            className="button" className="locationsTopButtons"
          >
            {category}
          </button>
        })}
      </div>
      <div className="container">
        <div className="notifications is-primary">
          {filterLocations().map((location, index) => {
            return <div key={index} >
              <Link to={`/locations/${location._id}`}>
                <div className="tile is-parent">
                  <div className="tile is-child box">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{location.name}</p>
                        <p className="subtitle is-6">{'Category: ' + location.category}</p>
                        <p className="subtitle is-6">{'Address: ' + location.address}</p>
                        <p className="subtitle is-6">{'Postcode: ' + location.postcode}</p>
                        <p className="subtitle is-6">{'Timings: ' + location.timings}</p>
                        <button type="button" className="locationsWebButton" to={location.website}>Website</button>
                        {/*<p className="subtitle is-6">{'Website: ' + location.website}</p>*/}
                        <p className="subtitle is-6">{'About: ' + location.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tile is-child box">
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
  </div>
}

export default Locations 