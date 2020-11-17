import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import LocationForm from './LocationForm'

// import { set } from 'mongoose'
// import { ProgressPlugin } from 'webpack'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit } from '@fortawesome/free-solid-svg-icons'
// import Geocode from 'react-geocode'


const EditLocation = (props) => {

  console.log(props)
  const locationId = props.match.params.locationId
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

  const categoriesObject = [
    { value: 'Farmers Market', label: 'Farmers Market' },
    { value: 'Farm Shop', label: 'Farm Shop' },
    { value: 'Zero Waste Shop', label: 'Zero Waste Shop' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'EV Charging Station', label: 'EV Charging Station' },
    { value: 'Recycling/Upcycling/Repair', label: 'Recycling/Upcycling/Repair' },
    { value: 'Charity Shop', label: 'Charity Shop' }
  ]

  useEffect(() => {
    Axios.get(`/api/locations/${locationId}`)
      .then(({ data }) => {
        const formData = {
          ...data,

          category: categoriesObject.filter(option => {
            return data.category.some(category => {
              return category === option.value
            })
          })
        }
        updateFormData(formData)
        console.log(formData)
      })
  }, [])

  function setSelectedCategories(categories) {
    const newData = {
      ...formData,
      category: categories
    }
    updateFormData(newData)
  }


  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  console.log(endDate)
  console.log(startDate)


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
    console.log(event)
    const token = localStorage.getItem('token')
    const newFormData = {
      ...formData,
      startDate: startDate,
      endDate: endDate,
      category: formData.category.map(selected => {
        return selected.value
      })
    }

    Axios.put(`/api/locations/${locationId}`, newFormData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push(`/locations/${locationId}`)
      })
  }


  return <LocationForm
    handleSubmit={handleSubmit}
    // inputFields={inputFields}
    formData={formData}
    selectedCategories={formData.category}
    setSelectedCategories={setSelectedCategories}
    startDate={startDate}
    endDate={endDate}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    options={categoriesObject}
    handleChange={handleChange}
  />
}

export default EditLocation