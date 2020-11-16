import React, { useState } from 'react'

import MapGL, { Marker } from 'react-map-gl'

const Map = (props) => {
  console.log(props)

  const [viewPort, setViewPort] = useState({
    height: '300px',
    width: '600px',
    zoom: 15,
    latitude: props.location.latitude,
    longitude: props.location.longitude
  })

  return <MapGL
    mapboxApiAccessToken={'pk.eyJ1Ijoibmlja2hheWVzIiwiYSI6ImNrYmh2dW56NDA5ZnIyenB2MHJ4MGFnaWYifQ.IHXzZRvdxBtuH9Ro6nLKmQ'}

    {...viewPort}
    onViewportChange={(viewPort) => setViewPort(viewPort)}
  >
    <Marker
      latitude={props.location.latitude}
      longitude={props.location.longitude}
    >
      <div>
        <img width={20} height={20} src="https://cdn.pixabay.com/photo/2016/04/22/14/31/mouse-1345876_960_720.png" alt="" />
        <span>{props.location.name}</span>

      </div>
    </Marker>
  </MapGL >
}

export default Map