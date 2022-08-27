# gcp-three-legged-oauth
gcp oauth for node/react application to access cloud storage on users behalf


### FIRST TIME
create a .env file in server/
CLIENT_ID=""
CLIENT_SECRET=""
REDIRECT_URI="http://localhost:4000/api/auth/redirect"
FRONTEND_REDIRECT_URI_DEV="http://localhost:3000"

cd into `/client` and run `npm install`
cd into `/server` and run `npm install`

### DEV PROCESS
cd into `/client` and run `npm run start`
cd into `/server` and run `npm run dev`
