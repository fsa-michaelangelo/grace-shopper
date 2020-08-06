import React from 'react'
import {Link} from 'react-router-dom'

export default function breadIcon(props) {
  const bread = props.bread
  return (
    <div>
      <div>
        <h2>{bread.name}</h2>
        <img src={bread.imageUrl} />
        <p>{bread.quantity}</p>
        <h3>{bread.price}</h3>
        <p>{bread.description}</p>
      </div>
      <div>{/* <Link to={} */}</div>
    </div>
  )
}
