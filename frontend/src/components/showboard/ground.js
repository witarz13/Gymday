import React, {useState, useEffect} from 'react';
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
            console.log(data.timeAdd)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [props.uid]);
  return (
    <div className='show_Ground'>
      {data.map(item => (
                    <ActionItem name={item.actionName} weight={item.weight} sets={item.reps} date={item.timeAdd}/>
                  
              ))}
      
    </div>
  )
}

export default ground
