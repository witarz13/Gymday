import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddActivite from './addActivite'

const Info = (props) => {
  return (
    <div className='user_info'>
        <p>{props.userName}</p>
        <ThumbUpIcon color="primary" />
        <p>{props.likes}</p>
        <AddActivite uid={props.uid}/>
        
        
      
    </div>
  )
}

export default Info
