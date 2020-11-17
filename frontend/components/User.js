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
    </div>
  </div>

}
export default User