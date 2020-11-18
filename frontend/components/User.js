import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Rater from 'react-rater'

const User = (props) => {

  console.log(props)
  const userId = props.match.params.userId
  const [user, updateUser] = useState([])
  const [comments, updateComments] = useState([])
  const userName = localStorage.getItem('userName')
  const userAvatar = localStorage.getItem('userAvatar')

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        updateUser(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/users/${userId}/comments`)
      .then(resp => {
        updateComments(resp.data)
      })
  }, [])

  console.log(comments)

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
        {comments && comments.map(comment => {
          return <div key={comment._id} className="media">
            <figure className="media-left">
              <p className="subtitle is-capitalized">
                <strong>{userName}</strong>
              </p>
              <p className="image is-64x64">
                <img src={userAvatar} />
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
      </div>
    </div>
  </div>

}
export default User