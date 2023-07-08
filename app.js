const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors')
var bodyParser = require('body-parser')
var File = require('./file');
const Transaction = require('./transactions')

var log = require('logger').createLogger('logs/development.log'); // logs to a file

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000 , ()=> {
    console.log("Port Listen to 3000");
});


app.get('/api' , function (req,res,next) {
    log.info('START');
    // res.send('Hello World, from express');

    // console.log("Hitting. . . .");
    axios.get('http://nest.waada.nest/truroute/PUFONE',{
    params: {
        "name" : "1st",
    }
    }).then((result) => {
        log.info(`result of 1st api ${result.data.success}`);
        console.log(result.data);
    }).catch((err) => {
        
    });

    var res1 = null;
    axios.post('http://nest.waada.nest/truroute/PUFONE' ,{
        "name" : "POST 2nd",
    }).then((result) => {
        log.info(`result of 2st api ${result.data.success}`);
        res1 = result?.data?.success == true ? "True" : "False" ;
        return res.json("API Hit "+res1);
    }).catch((err) => {
        
    });

    log.info(`END`);
    
 });


 app.post('/file' , (req,res)=> {
    const fileObj = new File();
    return res.json(fileObj.getDta());
 })

app.post('/sql' , (req,res,next)=>{
    const Obj = new Transaction();
    return Obj.getData().then((result) => {
       return res.json(result)
    }).catch((err) => {
        
    });
});