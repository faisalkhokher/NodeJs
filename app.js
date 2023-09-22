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

app.get("/policies", (req, res, next) => {
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

app.get('/products' , (req,res) => {
  
  // var test = {'1':'world','2':'world2'}
  // for(let x in test)
  // {
  //   let inxed = x;
  //   let value = test[inxed]
  //   console.log('index ' + x + ' has value of ' + value)
  // }
  


  axios.get('https://dummyjson.com/products').then((result) => {
    arr = result.data.products;
    // Create an empty response object
    const response = {
      success: false,
      message: "",
      data: [],
    };
    // * ForEach
      // emptyData = [];
      // array.forEach(e => {
      //   eachData = [
      //     "MapId" = e['id']
      //   ]
      //   data.push(eachData); // Push each fdata object into the data array
      // });
      // console.log(emptyData);

    // * MAP
    const data = arr.map((p,i) => ({
      id : `Index Of ${i} is the value of ${p.title}`,
    }));

    response.success = true;
    response.message = "Data Fetched";
    response.data = data;
    return res.json(response)
  }).catch((err) => {
    console.log(err);
  });
});

