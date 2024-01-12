import React, { useState } from 'react';
import { render } from "react-dom";
import Header from './Header/Header';
import Profilo from './profilo/profilo';
import Ground from './showboard/ground';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from "react-router-dom";


function App(props) {
  const  [userInfo,setUserInfo] = useState({username:'Guest',UID:0,likes:0,style: "extreme",login:false});
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