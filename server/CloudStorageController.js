import express from "express";
// import { BigQuery } from "@google-cloud/bigquery"; //TODO add example
import { Storage } from "@google-cloud/storage";
import { credentials } from "./../AuthController.js";


const router = express.Router();


//this count be images too, using a json file for simplicity
//constraint: cant use signed urls
router.get('/some-json-file', async(req,res,next)=>{

    const storage = new Storage({ credentials, projectId: "ft-research" });
    try{
        const file = await storage
          .bucket(CLOUD_STORAGE_BUCKET)
          .file(
            `/some/non/public/path/to/json-file.json`
          )
          .download()
          .catch("err");

        const parsedFile = JSON.parse(file.toString("utf8"));
        res.send({parsedFile})

    } catch (e){
        res.send(e)
    }
})

export default router