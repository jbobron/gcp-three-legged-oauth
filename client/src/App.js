// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
  
import axios from 'axios';

const App = () =>{
  useEffect(()=>{
    axios.get('/status').then(response=>{
      console.log("axios response", response.data)
      // make auth call here 
    })

  },[])
  return (
    <div className="App">
      <header className="App-header">
        <div>hello world, making request</div>
      </header>
      {/* add protected route where we make cloud storage call */}
    </div>
  );
}

export default App;

