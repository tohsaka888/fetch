import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function Login(props) {
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');

  const Send = async() => {
    const res = await fetch('http://localhost:8000/add',{
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      }, 
      method:'POST',
      body:JSON.stringify({user: user,pass:pass}),
      mode:"cors"
    })
    const data = await res.json();
    if(data.login === 'ok'){
      props.setState(true)
      console.log(props.state)
    }
  }
  
  return (
    <div>
      <input type='text' name="user" onChange={(event)=>{setUser(event.target.value)}}></input>
      <input type='password' name='password' onChange={(event)=>{setPass(event.target.value)}}></input>
      <input type='submit' onClick={Send}></input>
    </div>
  )
}


function App() {
  
  const [loginState,setLoginState] = useState(false);

  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <Login state={loginState} setState={setLoginState}></Login>
        </Route>
      </Router>
      <Router>
        <Route path='/login' component={Login}></Route>
      </Router>
    </div>
  );
}

export default App;