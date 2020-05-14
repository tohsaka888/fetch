import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function Login(state,setState) {
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
      setState(true)
      console.log(state)
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

function Hello () {
  return <h1>hello</h1>
}


function App() {

  const [loginState,setLoginState] = useState(false);
  
  if(loginState === false){
    return (
      <Router>
        <Route path='/login' exact component={Login}>
          <Login state={loginState} setState={setLoginState} />
        </Route>
        <Switch>
          <Route path='/' exact component={Hello}></Route>
        </Switch>
      </Router>
    )
  }else{
    return (
      <Router>
        <Route path='/login' component={Login}>
          <Login state={loginState} setState={setLoginState} />
        </Route>
        <Switch>
          <Route path='/' exact component={Login}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;