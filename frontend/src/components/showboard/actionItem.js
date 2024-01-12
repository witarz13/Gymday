import React from 'react'

const actionItem = (props) => {
  return (
    <div className='actionItem'>
        <p>name:{props.name}</p>
        <p>weight:{props.weight}</p>
        <p>Sets:{props.sets}</p>
        <p>date:{props.date}</p>
    </div>
  )
}

export default actionItem
