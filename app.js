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

const port = 4000;

app.listen(port, () => 
{
    console.log('Running on port ' + port);
});



//PUT http://localhost:4000/usermanagement/add_new_customer/:token
// GET http://localhost:4000/usermanagement/get_all_customers/: token
// Post http://localhost:4000/usermanagement/login
// patch http://localhost:4000/usermanagement/update_one_customer_info/:token
// del http://localhost:4000/usermanagement/delete_one_customer_info/Johncena/:token

