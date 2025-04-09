import React from 'react'
import "./buttons.css"
import { Link } from 'react-router'

const ButtonLink = ({ route, children }) => {
  return <Link to={route}><button className='links'>{children}</button></Link>
}

export default ButtonLink