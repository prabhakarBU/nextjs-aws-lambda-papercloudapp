// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
// const { readFile, writeFile } = require('fs').promises
// import CryptoJS from "crypto-js";
import os from "os";
var hostname = os.hostname();

export default async function lambdaCall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.method);

    //replace api value with your Api Gateway url
    const api =
      "https://bsamrhrl89.execute-api.us-east-1.amazonaws.com/staging";
    const data = { name: "papercloudapp" };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Credentials": "true",
    };
    var axiosResponse: any;
    const getAxiosResponse = await axios
      .post(
        api,
        { body: data },
        {
          headers: headers,
        }
      )
      .then((response) => {
        // console.log(response);
        axiosResponse = response;
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("came after axios!!!", getAxiosResponse);
    console.log("came after axios response!!!", axiosResponse);
    res.status(200).json({
      success: axiosResponse.data.body,
    });
  } catch (error: any) {
    console.log("error catch block", error.message);
    res.status(200).json({ error: error.message });
  }
}
