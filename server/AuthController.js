import express from "express";
import { OAuth2Client } from "google-auth-library";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const router = express.Router();
export let credentials = {} //TODO: ANTIPATTERN, how do we pass credentials/access_token from here to CloudStorageController

router.get("/generate-auth-url", (_req, res) => {
    const url = OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI).generateAuthUrl({
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: scopes,
    });
    res.send({ url });
});

router.get("/redirect", async (req, res) => { //auth-calback
    let queryData = url.parse(req.url, true).query;
    const client = getBaseClient()
    const { tokens } = await client.getToken(queryData.code);
    credentials = {
        type: "authorized_user",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        access_token: tokens.access_token, // Expires after 60 minutes, but gets refreshed if refresh token is stored in auth client credentials
        refresh_token: tokens.refresh_token,
        id_token: tokens.id_token
    };
    client.setCredentials(tokens);
    const tokenInfo = await client.getTokenInfo(
      client.credentials.access_token
    );
    console.log("tokenInfo ", tokenInfo);
    let location = process.env.FRONTEND_REDIRECT_URI_DEV;

    res
      .writeHead(301, {
        Location: location + `?refresh_token=${tokens.refresh_token}`,
      })
      .end();
    });



export default router