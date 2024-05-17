import React from 'react'
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
const actionItem = (props) => {
  function formatDateTime(isoString) {
    const date = new Date(isoString);
  
    // 格式化日期和时间
    const formattedDate = date.toLocaleDateString('en-CA', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-CA', {
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });
  
    return `${formattedDate} ${formattedTime}`;
  }
  function onFireblock(weight){
    if(weight>99){
      return '#ff69b4'
    }
    else if(weight>49){
      return '#8fbc8f'
    }
    else{
      return '#a9a9a9'
    }
  }
  return (
    <Container class ="actionItem" style={{ borderRadius: '10px', width: 200, 
    height: 220, backgroundColor: onFireblock(props.weight) }}>
        <p>{props.name}</p>
        <p>Weight:{props.weight}</p>
        <p>Sets:{props.sets}</p>
        <p>Time:{formatDateTime(props.date)}</p>
        <DeleteIcon style={{right: 0,bottom: 0 }}/>
        
    </Container>

  )
}

export default actionItem
