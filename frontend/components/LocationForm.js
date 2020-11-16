import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Datepicker from 'react-datepicker'


const LocationForm = ({ handleSubmit, handleChange, inputFields, formData,
  selectedCategories, setselectedCategories, options
  // setStartDate, setEndDate, startDate, endDate 
}) => {


  return <div className="container is-fluid mt-5">
    <form className='' onSubmit={handleSubmit}>
      {inputFields.map((field, index) => {
        return <div key={index} className='field'>
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

      })}



      {/* <div className="field">
        <label className='label' onClick={() => setIsVisible(!isVisible)}>Category*</label>
      </div> */}
      {/* <FontAwesomeIcon icon={faEdit} className='label' />         */}
      {/* {isVisible &&  */}
      <div className="is-multiple control">
        <Select
          closeMenuOnSelect={false}
          value={selectedCategories}
          onChange={setselectedCategories}
          components={makeAnimated()}
          options={options}
          isMulti
          autoFocus
          isSearchable
          placeholder="Select the category available"
          className="basic-multi-select"

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
            onChange={handleChange}
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


      {/* <div className="field">
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
      </div> */}
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

export default LocationForm