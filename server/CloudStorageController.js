import express from "express";
// import { BigQuery } from "@google-cloud/bigquery"; //TODO add example
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const router = express.Router();


//this count be images too, using a json file for simplicity
//constraint: cant use signed urls
router.get('/some-json-file', async(req,res)=>{

    const authHeaders = req.headers["authorization"];

    let refresh_token = authHeaders.replace(/^Bearer\s+/, "");

    let credentials = {
      type: "authorized_user",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refresh_token,
  };
    try {
        const storage = new Storage({ credentials, projectId: "some-project-id" });
        const file = await storage
          .bucket('some-bucket')
          .file(
            `/some/non/public/path/to/json-file.json`
          )
          .download()

        const parsedFile = JSON.parse(file.toString("utf8"));
        res.send({parsedFile})

    } catch (e){
      //OK ERRORS
      // ApiError: <some email> does not have storage.objects.get access to the Google Cloud Storage object.
      // ApiError: No such object: some-bucket/some/non/public/path/to/json-file.json

      //BAD ERRORS (we are not authenticated)
      //The incoming JSON object does not contain a client_email field
      //invalid grant

      res.status(e.code).send(e.message)
    }
})

export default router