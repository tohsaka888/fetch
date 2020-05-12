import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function hello() {
  return <h1>hello</h1>
}

function Login(state,setState) {
  setState(true)
  console.log(state)
}


function App() {
  const [loginState,setLoginState] = useState(false);
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
    console.log(data.login)
    if(data.login === 'ok'){
      Login(loginState,setLoginState)
    }
  }

  return (
    <div className="App">
      <Router>
        <Route exact path='/'>
          <div>
            <input type='text' name="user" onChange={(event)=>{setUser(event.target.value)}}></input>
            <input type='password' name='password' onChange={(event)=>{setPass(event.target.value)}}></input>
            <input type='submit' onClick={Send}></input>
          </div>
        </Route>
      </Router>
      <Router>
        <Route path='/login' component={hello}></Route>
      </Router>
    </div>
  );
}

export default App;