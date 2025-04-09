import React from 'react'

const Button = (props) => (
  <button onClick={props.onClick} role={props.role}>
    {props.children}
  </button>
)

export default Button