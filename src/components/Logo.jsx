import React from 'react'
import logo from "../assets/logo-removebg-preview.png"
function Logo({width= '100px'}) {
  return (
    <div className={`text-black font-bold  w-36`}>
      <img src={logo} />
    </div>
  )
}

export default Logo