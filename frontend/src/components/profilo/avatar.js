import React from 'react'

const avatar = (props) => {
  let imageUrl='..\\static\\image\\runner.png';
  if (props.style=="extreme"){
    imageUrl="..\\static\\image\\All.png";
  } else if (props.style=="anaerobic"){
    imageUrl="..\\static\\image\\Bench press.png";
  } else {
    imageUrl="..\\static\\image\\runner.png";
  }
  return (
    <div className="circle-image-container">
      <img src={imageUrl} alt={props.style} className="circle-image" />
    </div>
  )
}

export default avatar
