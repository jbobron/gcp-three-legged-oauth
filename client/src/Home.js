import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleGetCloudStorageData = ()=>{
    const options = { headers: {"Authorization" : `Bearer ${localStorage.getItem("refresh_token")}`} }
    axios.get('/api/cloud-storage/some-json-file', options)
    .then(response=>{
      console.log("axios response", response.status, response)
    })
    .catch(e=>{
      console.log("error", e)
    })
  }

  return (
    <div>
      <button onClick={handleLogout}>
          Logout
      </button>
      <button onClick={handleGetCloudStorageData}>
        Make Authenticated GCP Cloud Storage Call
      </button>


      <div>
      <h1>Click the "Make Authenticated GCP Cloud Storage Call" button </h1>
      <h2>Check console for response, there should be some kind of error:</h2>
      <h3>OK ERRORS (403, 404) (assume that we have to right GCP permissions/access and the file exists) </h3>
      <p>ApiError: -some email- does not have storage.objects.get access to the Google Cloud Storage object.</p>
      <p>ApiError: No such object: some-bucket/some/non/public/path/to/json-file.json</p>

      <h3>BAD ERRORS (400) (we are not making an authenticated request to Cloud Storage node.js lib )</h3>
      <p> press the button below and then re-click the "Make Authenticated GCP Cloud Storage Call" button to see this error</p>
      <button onClick={()=>{localStorage.removeItem("refresh_token")}}>Remove Access Token from API request</button>
      <p>The incoming JSON object does not contain a client_email field</p>
      <p>invalid grant</p>
      </div>
    </div>
  )

  
};

export default Home;
