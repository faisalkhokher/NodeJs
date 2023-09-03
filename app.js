const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
var bodyParser = require("body-parser");
var File = require("./Controller/file");
const PolicyController = require("./Controller/PolicyController");
const http = require('http');
const fs = require('fs');
// const url = require('url');

var log = require("logger").createLogger("logs/development.log"); // logs to a file
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * HTTP
port = 4000; 
const server = http.createServer( (req,res) => {
  console.log(req.url);
  if (req.url == '/index') {
    fs.readFile('index.html' , 'utf-8' , (err,data)=>{
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    }
    })
  }
});

// * Port Listen
server.listen(port , '127.0.0.1' , function (req,res) { 
  console.log(`Http Server Enable on Port ${port}`);
})
app.listen(3000, () => {
  console.log("Port Listen to 3000");
});


// * APIs
app.get("/api", function (req, res, next) {
  log.info("START");
  // res.send('Hello World, from express');

  // console.log("Hitting. . . .");
  axios
    .get("http://nest.waada.nest/truroute/PUFONE", {
      params: {
        name: "1st",
      },
    })
    .then((result) => {
      log.info(`result of 1st api ${result.data.success}`);
      console.log(result.data);
    })
    .catch((err) => {});

  var res1 = null;
  axios
    .post("http://nest.waada.nest/truroute/PUFONE", {
      name: "POST 2nd",
    })
    .then((result) => {
      log.info(`result of 2st api ${result.data.success}`);
      res1 = result?.data?.success == true ? "True" : "False";
      return res.json("API Hit " + res1);
    })
    .catch((err) => {});

  log.info(`END`);
});

app.post("/file", (req, res) => {
  const fileObj = new File();
  return res.json(fileObj.getDta());
});

app.post("/policies", (req, res, next) => {
  console.log("Hit PO");
  const Obj = new PolicyController();
  return Obj.getPolicies()
    .then((result) => {
      return res.json({
        success: true,
        message: "Policies",
        data: result,
      });
    })
    .catch((err) => {});
});

