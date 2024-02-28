import React, { useState, useEffect} from 'react';
import ActionItem from './actionItem';
import axios from 'axios';


const ground = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
   
    const fetchData = async () => {
        try {
            const response = await fetch(`/data/userAction/${props.uid}/`); // 使用 props 中的 uid
            const jsonData = await response.json();
            setData(jsonData);
            localStorage.setItem('added', false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const checkUpdate = () =>{
      
      if (props.uid>0 && localStorage.getItem('added')==='true'){//only ftech data if new activity be added
        fetchData();
        
      }

    };
    const interval = setInterval(checkUpdate, 10000);

    if( props.uid>0){
      return () => clearInterval(interval);
    }
    
    
   
}, [props.uid]);
  return (
    <div className='show_Ground'>
      { props.uid>0 ? data.map(item => (//if uid =0, means logouted,so null
                    <ActionItem name={item.actionName} weight={item.weight} sets={item.reps} date={item.timeAdd}/>
                  
              )):null}
      
    </div>
  )
}

export default ground
