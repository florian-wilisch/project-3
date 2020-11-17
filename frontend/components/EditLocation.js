import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import LocationForm from './LocationForm'

// import { set } from 'mongoose'
// import { ProgressPlugin } from 'webpack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Geocode from 'react-geocode'

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





  // const [selectedCategories, setSelectedCategories] = useState([])
  // // console.log(selectedCategories)



  // useEffect(() => {
  //   // Map catergories to only keep the value property
  //   const categoryArray = selectedCategories.map(one => {
  //     return one.value
  //   })
  //   const data = {
  //     ...formData,
  //     startDate: startDate,
  //     endDate: endDate,
  //     category: categoryArray
  //   }
  //   updateFormData(data)
  //   console.log(data)
  // }, [selectedCategories, startDate, endDate])




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

  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState(null)



  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  console.log(endDate)
  console.log(startDate)

  // const startDate = formData.startDate
  // const endDate = formData.startDate


  // function setStartDate() {
  //   const newData = {
  //     ...formData,
  //     startDate: startDate
  //   }
  //   updateFormData(newData)
  // }

  // function setEndDate() {
  //   const newData = {
  //     ...formData,
  //     endDate: endDate
  //   }
  //   updateFormData(newData)
  // }


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


  // Geocode.setApiKey('AIzaSyC6bRnHd5tsxEi2FqVjHSMwAl5sLWMXkL8')
  // Geocode.fromAddress('London').then(
  //   response => {
  //     const { lat, lng } = response.results[0].geometry.location
  //     console.log(lat, lng)
  //   },
  //   error => {
  //     console.error(error)
  //   }
  // )



  // const [isVisible, setIsVisible] = useState(false)

  return <LocationForm
    handleSubmit={handleSubmit}
    inputFields={inputFields}
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