import React from 'react';
import axios from 'axios';
import './App.css';

const Login = () =>{

  const handleLogin = ()=>{
    axios.get('/api/auth/generate-auth-url').then(response=>{
      console.log("axios response", response.data)
      window.location.href = response.data.url;
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
        <button onClick={handleStatus}>Check Environment Variables (check console)</button> 
              
        <button onClick={handleLogin}>Login</button>
      </header>
      <h3>1) First click the check env variables button </h3>
      <p> you will need to create an oauth2 client ID in GCP <a target="_blank" href="https://console.cloud.google.com/apis/credentials/oauthclient">here</a> </p>
      <p> in server/, create a file .env and add:</p>
      <code>
        CLIENT_ID="your gcp client-id"<br></br>
        CLIENT_SECRET="your gcp client-secret"<br></br>
        REDIRECT_URI="http://localhost:4000/api/auth/redirect"<br></br>
        FRONTEND_REDIRECT_URI_DEV="http://localhost:3000<br></br>
      </code>
      <p> open dev console and confirm client_id, client_secret, redirect_uri are set</p>


      <h3>2) Login </h3>
      <p>This will take you through the Oauth consent screen, and we will get a code from the redirect url</p>

    </div>
  );
}

export default Login;
