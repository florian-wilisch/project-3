import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    bio: '',
    city: '',
    avatar: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    bio: '',
    city: '',
    avatar: '',
    password: '',
    passwordConfirmation: ''
  })

  function handleChange(event) {

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

    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/signup', formData)
      .then(resp => {
        console.log(resp.data)
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })

  }
  return <form onSubmit={handleSubmit}>
    <div>
      <label>Username</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.username}
        name="username"
      />
      {errors.username && <p style={{ color: 'red' }}>
        {`There was a problem with your ${errors.username.path}`}
      </p>}
    </div>
    <div>
      <label>Email</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.email}
        name="email"
      />
      {errors.email && <p style={{ color: 'red' }}>
        {`There was a problem with your ${errors.email.path}`}
      </p>}
    </div>
    <div>
      <label>Bio</label>
      <textarea
        placeholder="Describe yourself.."
        type="text"
        onChange={handleChange}
        value={formData.bio}
        name="bio"
        className="textarea"
      />
    </div>
    <div>
      <label>City</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.city}
        name="city"
      />
      {errors.email && <p style={{ color: 'red' }}>
        {`There was a problem with your ${errors.city.path}`}
      </p>}
    </div>
    <div>
      <label>Avatar</label>
      <input
        type="text"
        onChange={handleChange}
        value={formData.avatar}
        name="avatar"
      />
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        onChange={handleChange}
        value={formData.password}
        name="password"
      />
      {errors.password && <p style={{ color: 'red' }}>
        {`There was a problem with your ${errors.password.path}`}
      </p>}
    </div>
    <div>
      <label>Confirm Password</label>
      <input
        type="password"
        onChange={handleChange}
        value={formData.passwordConfirmation}
        name="passwordConfirmation"
      />
      {errors.passwordConfirmation && <p style={{ color: 'red' }}>
        {'Does not match password'}
      </p>}
    </div>
    <button>Signup</button>
  </form>

}

export default Register