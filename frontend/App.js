import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import Home from './components/Home'
// import SingleLocation from './components/SingleLocation'
import Locations from './components/Locations'
// import Register from './components/Register'
// import Login from './components/Login'
// import Navbar from './components/Navbar'
// import AddLocation from './components/AddLocation'
// import EditLocation from './components/EditLocation'
// import EditComment from './components/EditComment'

import './styles/style.scss'

// For environment varibles
// console.log(process.env.hello)




const App = () => (

  <BrowserRouter>
    {/* <Navbar/> */}
    <Switch>
 {/*     <Route exact path='/' component={Home}/> */}
      <Route exact path='/locations' component={Locations}/>
      {/*     <Route exact path='/register' component={Register}/>
  //     <Route exact path='/login' component={Login}/>
  //     <Route exact path='/locations/new-location' component={AddLocation}/>
  //     <Route exact path='/locations/edit-location/:locationId' component={EditLocation}/>
  //     <Route exact path='/locations/:locationId' component={SingleLocation}/>
  //     <Route exact path='/locations/edit-comment/:locationId/:commentId/:commentIndex' component={EditComment}/> */}
    </Switch>
  </BrowserRouter>

  // return <button className="button is-primary" >Hello friends</button>
)

export default App