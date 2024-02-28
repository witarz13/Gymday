import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
const logOutButton = (props) => {
    const sendloginback =(data)=>{
        localStorage.clear()
        props.update({username:'Guest',UID:0,likes:0,style: "extreme",login:false})
    }
  return (
    <div>
        <Button variant='contained' color='primary' onClick={sendloginback}>Log Out</Button>
      
    </div>
  )
}

export default logOutButton
