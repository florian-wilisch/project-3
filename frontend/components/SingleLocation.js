import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Rater from 'react-rater'
import Map from './Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far, faEdit } from '@fortawesome/free-solid-svg-icons'

import '../../node_modules/react-rater/lib/react-rater.css'

const SingleLocation = (props) => {
  console.log(props)
  const locationId = props.match.params.locationId
  console.log(locationId)

  const [location, updateLocation] = useState([])

  const [formData, updateFormData] = useState({
    text: '',
    rating: null
  })


  const [errors, updateErrors] = useState({
    text: '',
    rating: undefined
  })

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')
  const userBio = localStorage.getItem('userBio')
  const userCity = localStorage.getItem('userCity')
  const userEmail = localStorage.getItem('userEmail')
  const userAvatar = localStorage.getItem('userAvatar')

  console.log(userId, userName, userBio, userCity, userEmail, userAvatar)
  useEffect(() => {
    axios.get(`/api/locations/${locationId}`)
      .then(resp => {
        updateLocation(resp.data)
      })
  }, [])

  function handleDelete() {
    axios.delete(`/api/locations/${locationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/locations')
      })
  }

  function setRating(rating) {
    const newData = {
      ...formData,
      rating: rating.rating
    }
    updateFormData(newData)
    console.log(newData)
  }

  function handleChange(event) {
    console.log(event)
    console.log(event.rating)
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }
    //! Finally update the formData
    updateFormData(data)
    updateErrors(newErrors)
    console.log(errors)

  }
  console.log(formData)

  function handleComment(event) {
    event.preventDefault()

    axios.post(`/api/locations/${locationId}/comments`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          updateFormData({
            text: '',
            rating: null
          })
          updateLocation(resp.data)
        }
      })
  }

  function handleDeleteComment(commentId) {
    axios.delete(`/api/locations/${locationId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateLocation(resp.data)
      })
  }

  if (!location.category) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-link" max="100">60%</progress>
      </div>
    </div>
  }
  // console.log(userId)
  // console.log(location.comments.some(comment => {
  //   return comment.user._id === userId
  // }))
  // console.log(location.comments[0].user._id)

  return <div className="container">
    <div className="level">
      <h1 className="title is-1 is-primary">{location.name}</h1>

      {/* <div className="level-item buttons are-small"> */}
      {/* {isCreator(location.user) &&
          <Link to={`/locations/edit-location/${locationId}`} className="button is-warning is-light">🛠 Edit Location</Link>}
        {isCreator(location.user) &&
          <button onClick={handleDelete} className="button is-danger is-light">✂️ Delete Shop</button>} */}

      {isCreator(location.user) && <div className="dropdown is-hoverable is-right">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Edit Options</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <Link to={`/locations/edit-location/${locationId}`} className="dropdown-item">🛠 Edit Location</Link>
            <button onClick={handleDelete} className="dropdown-item">✂️ Delete Location</button>

          </div>
        </div>
      </div>}
      {/* </div> */}


    </div>



    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile">
          <div className="tile is-parent">
            <article className="tile is-child box">
              {/* <p className="title"></p>
                <p className="subtitle"></p>
                <p className="subtitle"></p> */}

              <figure className="image is-4by3">
                <img src={location.image} alt={location.name} />
              </figure>
              <br />
              <div className="tags">
                {location.category.map((category, index) => {
                  return <div className="tag is-warning" key={index}>
                    {category}
                    {/* <br /> <span ></span> */}
                  </div>
                })}
              </div>

            </article>
          </div>
          <div className="tile is-parent is-vertical">
            <article className="tile is-child box">
              <p className="title">🗺</p>
              <p className="subtitle">{location.address}</p>
              <p className="subtitle">{location.postcode}</p>
              <p className="subtitle">{location.city}</p>

            </article>
            <article className="tile is-child box">
              <p className="title">Opening Hours</p>
              <p className="content">🕰 {location.timings}</p>

            </article>
          </div>

        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            {/* <p className="title">📍</p> */}
            <p className="subtitle">{location.address}</p>
            <p className="subtitle">{location.postcode}</p>
            <p className="subtitle">{location.city}</p>
            <p className="content">🌍 <a href={location.website}>Website</a></p>
            <p className="content">📧 {location.email}</p>
            <p className="content">📲 {location.phone}</p>
            {location.latitude && <Map location={location} />}
          </article>
        </div>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <div className="content">
            <p className="title">Description</p>
            <p className="subtitle"></p>
            <div className="content">
              <p>{location.bio}</p>
            </div>
            <div className="content">
              <p className="title">Events</p>
              <p>Start date</p>
              <p>{new Date(location.startDate).toLocaleDateString()}</p>
              <p>End date</p>
              <p>{new Date(location.endDate).toLocaleDateString()}</p>

            </div>
          </div>
        </article>
      </div>
    </div>

    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
          <p className="title">Get in touch</p>
          <p className="content">🌍 <a href={location.website}>Website</a></p>
          <p className="content">📧 {location.email}</p>
          <p className="content">📲 {location.phone}</p>
        </article>
      </div>

      {/* Comments box */}
      <div className="tile is-parent is-8">
        <article className="tile is-child box">
          <p className="title">Reviews</p>
          {/* <p className="subtitle">With some content</p> */}
          <div className="content">
            {location.comments && location.comments.map(comment => {
              return <div key={comment._id} className="media">
                <figure className="media-left">
                  <Link to={`/users/${comment.user._id}`} className="subtitle">
                    <strong className="is-capitalized">{comment.user.username}</strong>
                  </Link>
                  <p className="image is-64x64">
                    <img src={comment.user.avatar} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <Rater
                      total={5}
                      rating={comment.rating}
                      interactive={false}
                      className="react-rater"
                    />

                    <p>{comment.text} - I give {comment.rating} stars</p>
                  </div>
                </div>
                {isCreator(comment.user._id) && <div className="media-right">
                  <Link to={`/locations/edit-comment/${locationId}/${comment._id}`} className="edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>

                  <button className="delete"
                    onClick={() => handleDeleteComment(comment._id)}></button>
                </div>}
              </div>
            })}
          </div>

          {/* POST comment */}
          <div className="media"></div>

          {!location.comments.some(comment => {
            return comment.user._id === userId
          }) &&
            <div className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={userAvatar} />
                </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <form className="control"
                    onSubmit={handleComment}
                  >
                    <Rater
                      total={5}
                      onRate={setRating}
                      className="react-rater"

                    />
                    {errors.rating && <p style={{ color: 'red' }}>
                      {`There was a problem with your ${errors.rating.path}`}
                    </p>}
                    <textarea
                      className="textarea"
                      value={formData.text}
                      name="text"
                      placeholder="Write your review"
                      onChange={handleChange}
                    >
                      {errors.text && <p style={{ color: 'red' }}>
                        {`There was a problem with your ${errors.text.path}`}
                      </p>}
                    </textarea>

                    <div className="field">
                      <p className="control">
                        <button
                          className="button is-info"
                        >
                          Submit
                        </button>
                      </p>
                    </div>
                  </form>
                </div>

              </div>
            </div>}


        </article>
      </div>

    </div>

  </div >
}

export default SingleLocation