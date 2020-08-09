import React from 'react'
import {Link} from 'react-router-dom'

export default function BreadIcon(props) {
  const bread = props.bread
  return (
    <div>
      <Link to={`/breads/${bread.id}`}>
        <h2>{bread.name}</h2>
        <img src={bread.imageUrl} />
        <p>Available Quantity: {bread.quantity}</p>
        <h3>Price: ${bread.price}</h3>
        <p>{bread.description}</p>
      </Link>
    </div>
  )
}
