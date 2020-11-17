import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const User = (props) => {

  console.log(props)
  console.log(user)
  const userId = props.match.params.userId
  const [user, updateUser] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        updateUser(resp.data)
      })
  }, [])

  if (!user.username) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-link" max="100">60%</progress>
      </div>
    </div>
  }
  return <div className="container is-fluid mt-5">
    <div className="columns">
      <div className="column">

      </div>
      <div className="column">
        <figure className="image is-square">
          <img className=" is-rounded" src={user.avatar} />
        </figure>
      </div>
      <div className="column"></div>
    </div>
    <div className="container is-fluid has-text-centered mt-5">
      <h1 className="title is-1 is-capitalized">{user.username}</h1>
      <h2 className="subtitle is-3">Location: {user.city}</h2>
      <h2 className="subtitle is-3">Bio:</h2>
      <p>{user.bio}</p>
    </div>
    <div className="container is-fluid mt-5">
      <h2 className="subtitle is-3 is-capitalized">{user.username}'s comments:</h2>
      <div className="content">
        {/* COMMENTS HERE **************** */}
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
          </div>
        })}
      {/* ****************** */}
      </div>
    </div>
  </div>

}
export default User