import React from 'react'
import Avatar from './avatar'
import Info from './Info'


const profilo = (props) => {
  return (
    <div className='profile_left'>
      <Avatar style={props.style}  />        
      <Info userName={props.name} uid={props.uid} likes={props.likes}/>
    
    </div>
  )
}

export default profilo
