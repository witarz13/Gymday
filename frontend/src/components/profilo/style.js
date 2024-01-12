import React, { useState } from 'react'

const stylePage = () => {
  const [style,setStyle ]=useState('Decathlon');

  function styAll(input_style){
    setStyle(input_style);
    document.getElementById("Decathlon_style_image").style.border ="2px solid red ";
    document.getElementById("Aerobics_style_image").style.border =" 2px solid red";
    document.getElementById("Anaerobic_style_image").style.border ="2px solid red ";
    document.getElementById(input_style).style.border = "2px solid red";
  }
  
  return (
    <div>
        <label>
        <input
          type="radio"
          value="Decathlon"
          checked={styAll('Decathlon')}
        />
        <img src="..\static\image\Bench press.png" alt="Decathlon" id='Decathlon_style_image' />
      </label>

      <label>
        <input
          type="radio"
          value="Aerobics"
          checked={styAll('Aerobics')}
        />
        <img src="..\static\image\runner.png" alt="Aerobics" id='Aerobics_style_image' />
      </label>

      <label>
        <input
          type="radio"
          value="Anaerobic"
          checked={styAll("Anaerobic")}
        />
        <img src="..\static\image\ALL.png" alt="Anaerobic_style_image" />
      </label>
    </div>
  )
}

export default stylePage
