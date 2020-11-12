import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'

const SingleLocation = (props) => {
  console.log(props)
  // const locationId = props.match.params._id
  // const [location, updateLocation] = useState([])

  // const token = localStorage.getItem('token')

  // useEffect(() => {
  //   axios.get('../api/locations/5fad3c35b3c82b6956cf6660')
  //     .then(resp => {
  //       updateLocation(resp.data)
  //       console.log(resp.data)
  //     })
  // }, [])

  // console.log(location)
  return <div className="container">
    <div className="level">
      <h1 className="title is-3 is-primary">Location name</h1>

    </div>

    <div className="columns">
      {/* Column of picture */}
      <div className="column">
        <figure className="image is-3by4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/Shops_in_Ferdinand_Street%2C_London_NW1_-_geograph.org.uk_-_969349.jpg" alt={'shop.name'}></img>
        </figure>
      </div>

      {/* Column of card info */}
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content"></div>
              <h1>Name of Location</h1>

            </div>
          </div>
        </div>
      </div>


    </div>

    <div>
      <h1> comments section</h1>
    </div>
    <div>
      <h1> Map section</h1>
    </div>


  </div >
}

export default SingleLocation