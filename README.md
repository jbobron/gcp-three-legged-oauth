# gcp-three-legged-oauth
gcp oauth for node/react application to access cloud storage on users behalf

GOAL:
- to learn/document the prescribed best practice from Google on how to do this type of Auth, because its not clear in their documentation
- Document how to authenticate/manage user session with a REST api in node and pass around those credentials to endpoints that need to authenticate with google cloud services (ex: Cloud Storage/BigQuery, etc)


### FIRST TIME
create a `.env` file in `/server`
```
CLIENT_ID=""
CLIENT_SECRET=""
REDIRECT_URI="http://localhost:4000/api/auth/redirect"
FRONTEND_REDIRECT_URI_DEV="http://localhost:3000"
```
- populate the `CLIENT_ID` and `CLIENT_SECRET` from GCP Oauth2 API keys

cd into `/client` and run `npm install`
cd into `/server` and run `npm install`

### DEV PROCESS
cd into `/client` and run `npm run start`
cd into `/server` and run `npm run dev`




CONSTRANTS
- we need to use a Oauth Client Id https://console.cloud.google.com/apis/credentials/oauthclient
- we cannot use a service account, or download any api keys besides the Oauth Client Id
- the data in cloud storage we are viewing is private and cannot be made public
- we cannot use signed urls for cloud storage data


QUESTIONS
- 1) do i need a db users table to store email, refresh/access tokens, and expiry date? or can we reply on google to manage our users?
- 1.5) if we dont need a db, how do we manage multiple concurrent users in production? lets say we are getting 5 requests at the same time from different users. we need our server to be "stateless" and never cache credentials (it must use a db for this right?)
- 2) do we need an nodejs server? should we be making this requests via the JSON Api endpoint instead of the node cloud storage library?
- 3) how does this code need to change to be deployed in Cloud Run in a docker container? (assume we are able to set/have access to the environment variables described above in Cloud Run)
- 4) how do we pass credentials/access_token/refresh_token from the AuthController to the CloudStorageController? or is that an antipattern? are we supposed to get the credentials/access_token/refresh_token from the browser localStorage?
- 5) what is the purpose of all of these libraries and which one(s) should i be using?
 - https://github.com/googleapis/google-api-nodejs-client
 - https://github.com/google/google-api-javascript-client
 - https://github.com/googleapis/google-cloud-node
 - https://github.com/googleapis/google-auth-library-nodejs
 -