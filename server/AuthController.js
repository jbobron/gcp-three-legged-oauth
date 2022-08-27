import express from "express";
import { OAuth2Client } from "google-auth-library";
import url from "url";
import dotenv from "dotenv";
dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const scopes = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/bigquery",
  ];

const router = express.Router();
export let credentials = {} //TODO: ANTIPATTERN, how do we pass credentials/access_token from here to CloudStorageController

router.get("/generate-auth-url", (_req, res) => {
    const url = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI).generateAuthUrl({
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: scopes,
    });
    console.log("url", url)
    res.send({ url });
});

router.get("/redirect", async (req, res) => { //auth-calback
    let queryData = url.parse(req.url, true).query;
    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { tokens } = await client.getToken(queryData.code);
    credentials = {
        type: "authorized_user",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        access_token: tokens.access_token, // Expires after 60 minutes, but gets refreshed if refresh token is stored in auth client credentials
        refresh_token: tokens.refresh_token,
        id_token: tokens.id_token
    };
    client.setCredentials(tokens);
    const tokenInfo = await client.getTokenInfo(
      client.credentials.access_token
    );
    console.log("tokenInfo ", tokenInfo);
    let location = "http://localhost:3000" //process.env.FRONTEND_REDIRECT_URI_DEV;

    res
      .writeHead(301, {
        Location: location + `?refresh_token=${tokens.refresh_token}`,
      })
      .end();
    });



export default router