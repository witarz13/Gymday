import React, { useState }  from 'react';
import { useEffect } from 'react';
import { render } from "react-dom";
import Header from './Header/Header';
import Profilo from './profilo/profilo';
import Ground from './showboard/ground';



function App(props) {
  const  [userInfo,setUserInfo] = useState({username:'Guest',UID:0,likes:0,style: "extreme",login:false});
  // const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  useEffect(() => {
    // 这里放置你的检查逻辑
    checkFunction();

  }, []); 

    const checkFunction = () => {
      
 
      const localUID=localStorage.getItem('UID');
     
     
      
      if (verifyToken() && localUID){
        const requestOptions ={
          method:"POST",
          headers: { 'Content-Type': 'application/json',},
          body: JSON.stringify({
              UID: localStorage.getItem('UID'),
          })
      }
    
        fetch("/data/trace_in",requestOptions).then((response)=> response.json())
            .then(data =>{
              setUserInfo(data)
    
            })
        }
    };
  const verifyToken = async () => {
    const accessToken = localStorage.getItem('access_token');

  
    if (!accessToken) {
      console.log('没有token');
      return false; 
    }
    else  {
      
        const response = await fetch('api/token/verify/', {
          method: 'POST',
          headers: {
            // 'Authorization': `Token ${accessToken}`, // 注意Django使用'Token'前缀
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token:accessToken
        })
        })
        .then(response => response.json())
        .catch(error => {
          console.error('请求错误', error);
          return false;
        });
        return true;
      }
       
      
    
  };
 
  const handleChildData = (data) => {// 接收来自子组件的数据
    
    setUserInfo(data);}
  
  return (
    <div className="App">
      <header className="App-header">
        <Header name={userInfo.username} logstate={userInfo.login} update={handleChildData} />
      </header>
      <body className='App-body'>
        <Profilo name={userInfo.username} uid= {userInfo.UID} likes={userInfo.likes} style={userInfo.style} />
        <Ground uid= {userInfo.UID}/>
      </body>

    </div>
    // <Router>
    //   <Switch>
    //       <Route path="/"><p>home page</p></Route>
    //       <Route path="join"><p>hellp</p></Route>
    //   </Switch>
    // </Router>
  );
}

export default App;




const appDiv=document.getElementById("app");
render(<App />,appDiv);