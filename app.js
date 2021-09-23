const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cors);
var whitelist = ['localhost:4000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  console.log(whitelist.indexOf(req.get('host')));
  if (whitelist.indexOf(req.get('host')) !== -1) {
    corsOptions = { origin: true } 
    callback(null, corsOptions) 
  } else {
    corsOptions = { origin: false } // disable CORS for this request
    callback(new Error('Not allowed by CORS'), corsOptions) 
  }
}



    
app.use(cors(corsOptionsDelegate)); 

var userAPis = require('./router/userManagementApis');

app.use('/usermanagement',userAPis);

app.get ('/', function (req, res, next) {
  console.log("Origin");
  return res.json ({msg: 'This is CORS-enabled for a Single Route'});
});


const port = 4000;

app.listen(port, () => 
{
    console.log('Running on port ' + port);
});