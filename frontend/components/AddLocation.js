import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Datepicker from 'react-datepicker'
import Axios from 'axios'
// import { set } from 'mongoose'
// import { ProgressPlugin } from 'webpack'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit } from '@fortawesome/free-solid-svg-icons'
// import Geocode from 'react-geocode'


const AddLocation = (props) => {
  
  const [formData, updateFormData] = useState({
    category: [],
    address: '',
    name: '',
    timings: '',
    startDate: '',
    endDate: '', 
    city: '',
    postcode: '',
    longitude: '',
    latitude: '',
    website: '',
    email: '',
    phone: '',
    bio: '',
    image: ''
  })

  const inputFields = [
    'name',
    'timings',
    // 'startDate',
    // 'endDate',
    'address',
    'city',
    'postcode',
    'longitude',
    'latitude',
    'website',
    'email',
    'phone',
    'bio',
    'image'
  ]

  const categories = [
    { value: 'Farmers Market', label: 'Farmers Market' },
    { value: 'Farm Shop', label: 'Farm Shop' },
    { value: 'Zero Waste Shop', label: 'Zero Waste Shop' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'EV Charging Station', label: 'EV Charging Station' },
    { value: 'Recycling/Upcycling/Repair', label: 'Recycling/Upcycling/Repair' },
    { value: 'Charity Shop', label: 'Charity Shop' }
  ]

  const [selectedCategories, setSelectedCategories] = useState([])
  // console.log(selectedCategories)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState(null)
  
  useEffect(() => {
    // Map catergories to only keep the value property
    const categoryArray = selectedCategories.map(one => {
      return one.value
    })
    const data = {
      ...formData,
      startDate: startDate,
      endDate: endDate,
      category: categoryArray
    }  
    updateFormData(data)
    console.log(data)
  }, [selectedCategories, startDate, endDate])

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
    Axios.post('/api/locations', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/locations')
      })
  }

  console.log(process.env.MapBoxKey)

  function handleCoordinates() {
    console.log(process.env.MapBoxKey)
    Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${formData.postcode}.json?access_token=pk.eyJ1Ijoibmlja2hheWVzIiwiYSI6ImNrYmh2dW56NDA5ZnIyenB2MHJ4MGFnaWYifQ.IHXzZRvdxBtuH9Ro6nLKmQ`)
      .then(resp => {
        console.log('Longitude is ' + resp.data.features[0].center[0])
        console.log('Latitude is ' + resp.data.features[0].center[1])
      })
  }


  


  const [isVisible, setIsVisible] = useState(false)

  return <div className="container is-fluid mt-5">
    <form className='' onSubmit={handleSubmit}>      
      <div className='field'>
        <label className='label'>Name*</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData[name]}
            name='name'
          />
        </div>
      </div>     
      <div className="field">
        <label className='label' onClick={() => setIsVisible(!isVisible)}>Category*</label>
      </div>
      {/* <FontAwesomeIcon icon={faEdit} color='' />         */}
      {/* {isVisible &&  */}
      <div className="control">
        <Select
          options={categories} 
          isMulti 
          onChange={setSelectedCategories}
          isSearchable
        />
      </div>
      {/* } */}
      <div className='field mt-3'>
        <label className='label'>Address*</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['address']}
            name='address'
            placeholder='Street and Number'
          />
        </div>
        <div className="control mt-1">
          <input
            label='postcode'
            className='input'
            type="text"
            onChange={
              // () => {
              handleChange
              // handleCoordinates
            // }
            }
            value={formData['postcode']}
            name='postcode'
            placeholder='Postcode'
          />
        </div>
        <div className="control mt-1">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['city']}
            name='city'
            placeholder='City'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Phone</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['phone']}
            name='phone'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Email</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['email']}
            name='email'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Website</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['website']}
            name='website'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Description</label>
        <div className="control">
          <input
            className='textarea'
            type="text"
            onChange={handleChange}
            value={formData['bio']}
            name='bio'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Photo</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['image']}
            name='image'
          />
        </div>
      </div>


      <div className="field">
        <label className='label'>Dates</label>
        <div className="control">
          <Datepicker 
            selected={startDate}
            onChange={date => setStartDate(date)}
            // onChange={handleDates}
            // isClearable
            placeholderText="Select start date"
            dateFormat='dd/MM/yyyy'
            className='input'
            startDate={startDate}
            endDate={endDate}
            // selectsRange
            // inline
          />
          <Datepicker 
            selected={endDate}
            onChange={date => setEndDate(date)}
            // isClearable
            placeholderText="Select end date"
            dateFormat='dd/MM/yyyy'
            className='input ml-2'
          />
        </div>
      </div>
      {/* {inputFields.map((field, i) => {
        return <div className='field' key={i}>
          <label className='label'>{field}</label>
          <div className="control">
            <input
              className='input'
              type="text"
              onChange={handleChange}
              value={formData[field]}
              name={field}
            />
          </div>
        </div>
      })}       */}
      <button className='button'>Submit</button>
    </form>
  </div>
}

export default AddLocation