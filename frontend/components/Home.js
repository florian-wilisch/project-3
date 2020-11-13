import React from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
// import bulma from 'bulma'

const Home = () => {

  return <section className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered mx-4">
        <p className="title is-spaced">
          GreenWorld
        </p>
        <p className='subtitle'>
          Are you trying to live a <strong>greener life</strong>, but don&apos;t know where to start? Well, you&apos;re in the right place!
        </p>
        <p  className='subtitle'>
          Search your area for <strong>shops</strong>, <strong>services</strong> and <strong>events</strong> that will help you make the first steps.
        </p>
        <Link className="button is-primary mt-2" to='/locations'>Start Here</Link>
      </div>
    </div>
  </section>
}

export default Home