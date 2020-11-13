import React, { useState } from 'react'
import Select from 'react-select'
import Datepicker from 'react-datepicker'

const AddLocation = () => {
  
  const [formData, updateFormData] = useState({
    category: [],
    name: '',
    timings: '',
    startDate: '',
    endDate: '',
    address: '',
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
    'startDate',
    'endDate',
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
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  function handleSubmit(){}

  function handleTypes(){}

  function handleChange(){}



  return <form className='addLocation-form' onSubmit={handleSubmit}>
    
    <label>Category</label>
    <Select options={categories} isMulti />
    
    <label>Dates</label>
    <Datepicker selected={startDate}
      onChange={date => setStartDate(date)}
      isClearable
      placeholderText="Select start date"
      dateFormat='dd/MM/yyyy'
      className=''

    />
    <Datepicker selected={endDate}
      onChange={date => setEndDate(date)}
      isClearable
      placeholderText="Select end date"
      dateFormat='dd/MM/yyyy'
      className=''
    />



    {inputFields.map((field, i) => {
      return <div key={i}>
        <label>{field}</label>
        <input
          type="text"
          onChange={handleChange}
          value={formData[field]}
          name={field}
        />
      </div>
    })}
    
    <button className='button'>Submit</button>
  </form>

}

export default AddLocation