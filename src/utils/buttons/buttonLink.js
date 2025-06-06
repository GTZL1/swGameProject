import React from 'react'
import { Link } from 'react-router'

const ButtonLink = ({ route, children, style }) => {
  return <Link to={route}><button className={`${style}`}>{children}</button></Link>
}

export default ButtonLink