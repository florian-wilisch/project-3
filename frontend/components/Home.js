import React from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
// import bulma from 'bulma'
import { usePosition } from 'use-position'

const Home = () => {
  const { latitude, longitude, error } = usePosition()



  localStorage.setItem('lat', latitude)
  localStorage.setItem('long', longitude)

  return <section className="hero is-fullheight-with-navbar">
    <div className="hero-body is-align-items-center has-text-centered">
      <div className="container has-text-centered ">
        <p className="title is-spaced">
          GreenWorld
        </p>
        <p className='subtitle'>
          Are you trying to live a <strong>greener life</strong>, but don&apos;t know where to start? Well, you&apos;re in the right place!
        </p>
        <p className='subtitle'>
          Search your area for <strong>shops</strong> and <strong>services</strong> that will help you make the first steps.
        </p>
        <Link className="button is-link mt-2" to='/map' latitude={latitude}>Find Nearby Locations</Link>
      </div>
    </div>
  </section>
}

export default Home