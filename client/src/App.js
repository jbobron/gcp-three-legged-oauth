// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';


//TODO: add react router with protected routes

const App = () =>{

  useEffect(()=>{
    const { refresh_token } = queryString.parse(window.location.search);
    if(refresh_token){
      console.log("storing refresh token in localStorage")
      localStorage.setItem("refresh_token", refresh_token)
    }
  })

  const handleLogin = ()=>{
    axios.get('/api/auth/generate-auth-url').then(response=>{
      console.log("axios response", response.data)
      window.location.href = response.data.url;
      // TODO: make auth call here 
    })
  }

  const handleStatus = ()=>{
    axios.get('/status').then(response=>{
      console.log("axios response", response.data)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>hello world, login with google</div>
        <button onClick={handleStatus}>Check if server environment vars are set (check console)</button>        
        <button onClick={handleLogin}>login (once env variables are set)</button>
      </header>
      {/* add protected route where we make cloud storage call */}
    </div>
  );
}

export default App;

