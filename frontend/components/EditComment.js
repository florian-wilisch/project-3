import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditComment = (props) => {
  console.log(props)
  const [formData, updateFormData] = useState({
    text: '',
    rating: 0
  })

  const inputFields = ['text', 'rating']

  useEffect(() => {
    axios.get(`/api/locations/${props.match.params.locationId}/comments/${props.match.params.commentIndex}`)
      .then(resp => {
        console.log(resp)
        updateFormData(resp.data)
      })

  }, [])

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    console.log(data)
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.put(`/api/locations/${props.match.params.locationId}/comments/${props.match.params.commentIndex}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/locations')
      })
  }

  if (!formData.rating) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-primary" max="100">60%</progress>
      </div>
    </div>
  }
  return <form onSubmit={handleSubmit}>
    {inputFields.map(field => {
      return <div key={field}>
        <label >{field}</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData[field]}
          name={field}
        />
      </div>
    })}
    <button>Submit</button>
  </form>
}

export default EditComment