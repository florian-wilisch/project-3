import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'

const SingleLocation = (props) => {
  console.log(props)
  const locationId = props.match.params.locationId
  console.log(locationId)
  const [location, updateLocation] = useState([])
  const [text, setText] = useState('')

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

  function handleComment() {
    axios.post(`/api/locations/${locationId}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
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
        <progress className="progress is-small is-primary" max="100">60%</progress>
      </div>
    </div>
  }
  console.log(location)

  return <div className="container">
    <div className="level">
      <h1 className="title is-1 is-primary">{location.name}</h1>

      <div className="level-item buttons">
        {/* {isCreator(location.user) && } */}
        <Link to={`/locations/edit-location/${location.name}`} className="button is-warning">🛠 Edit Location</Link>
        {/* {isCreator(location.user) && } */}
        <button onClick={handleDelete} className="button is-danger">✂️ Delete Shop</button>
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
              <p className="title">Map</p>
              <p className="subtitle">Aligned with the right column</p>
              <div className="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
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
                  <div className="media-content">
                    <div className="content">
                      <p className="subtitle">
                        {comment.user.username}
                      </p>
                      <p>{comment.text}</p>
                      <p>{comment.rating}</p>
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

            <div className="media">
              <div className="media-content">
                <div className="field">
                  <form className="control"
                    onSubmit={handleComment}>
                    <textarea
                      className="textarea"

                      placeholder="Make a comment.."
                    // onChange={handleChange}
                    >
                      {text}
                    </textarea>
                    <input
                      type="number"
                      // onChange={handleChange}
                      className="number"

                    />
                  </form>
                </div>
                <div className="field">
                  <p className="control">
                    <button
                      onClick={handleComment}
                      className="button is-info"
                    >
                      Submit
                    </button>
                  </p>
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