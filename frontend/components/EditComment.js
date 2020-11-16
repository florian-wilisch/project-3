import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditComment = (props) => {

  console.log(props)
  const [fetchedData, updatefetchedData] = useState({})
  const [formData, updateFormData] = useState({
    text: '',
    rating: 0
  })

  const inputFields = ['text', 'rating']

  useEffect(() => {
    axios.get(`/api/locations/${props.match.params.locationId}/comments/${props.match.params.commentId}`)
      .then(resp => {
        console.log(resp)
        updateFormData(resp.data)
        updatefetchedData(resp.data)
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
    axios.put(`/api/locations/${props.match.params.locationId}/comments/${props.match.params.commentId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/locations')
      })
  }

  if (!fetchedData.createdAt) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-primary" max="100">60%</progress>
      </div>
    </div>
  }
  return <div className="container is-fluid mt-5">
    <form onSubmit={handleSubmit}>
      {inputFields.map(field => {
        return <div className="field" key={field}>
          <label className="label">{field}</label>
          <div className="control">
            <input
              type="text"
              onChange={handleChange}
              value={formData[field]}
              name={field}
              className="input"
            />
          </div>

        </div>
      })}
      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button className="button is-primary">
            Submit
          </button>
        </p>
      </div>
    </form>

  </div>

}

export default EditComment