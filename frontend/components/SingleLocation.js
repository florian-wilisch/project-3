import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Map from './Map'


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
  console.log(location)

  return <div className="container">
    <div className="level">
      <h1 className="title is-1 is-primary">{location.name}</h1>

      <div className="level-item buttons are-small">
        {isCreator(location.user) &&
          <Link to={`/locations/edit-location/${location.name}`} className="button is-warning is-light">🛠 Edit Location</Link>}
        {isCreator(location.user) &&
          <button onClick={handleDelete} className="button is-danger is-light">✂️ Delete Shop</button>}
      </div>

    </div>


    <div className="testing" >

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
                {location.category.map((category, index) => {
                  return <div key={index}>
                    <span className="tag is-warning">{category}</span>
                  </div>
                })}
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
              <p className="title">📍</p>

              <Map location={location} />
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <div className="content">
              <p className="title">BIO</p>
              <p className="subtitle">With even more content</p>
              <div className="content">
                <p>{location.bio}</p>
              </div>
              <div className="content">
                <p className="title">Events</p>

                <p>{location.endDate}</p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">Get in touch</p>
            <p className="content">🌍 {location.website}</p>
            <p className="content">📧 {location.email}</p>
            <p className="content">📲 {location.phone}</p>
          </article>
        </div>

        {/* Comments box */}
        <div className="tile is-parent is-8">
          <article className="tile is-child box">
            <p className="title">Comments</p>
            <p className="subtitle">With some content</p>
            <div className="content">
              {location.comments && location.comments.map(comment => {
                return <div key={comment._id} className="media">
                  <figure className="media-left">
                    <p className="subtitle">
                      <strong>{comment.user.username}</strong>
                    </p>
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
                    <button className="delete"
                      onClick={() => handleDeleteComment(comment._id)}></button>
                  </div>}
                </div>
              })}
            </div>

            {/* POST comment */}
            <div className="media"></div>
            <div className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="Current User" />
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
                      placeholder="Make a comment.."
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
            </div>
          </article>
        </div>

      </div>
    </div >

  </div >
}

export default SingleLocation