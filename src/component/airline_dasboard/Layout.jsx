import React, { useState } from 'react'
import AirlineNav from './AirlineNav'

// Layout wraps Every airline route component
// Layout takes in Every route component Elements as children
const Layout = ( { children } ) => {

  return (
    <div>
        <AirlineNav/>
        { children }
    </div>
  )
}

export default Layout