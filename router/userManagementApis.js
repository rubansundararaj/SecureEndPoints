var express = require('express');
var apirouter = express.Router();
const {decodeAndAuthTokenJwtToken} = require('./../utils/auth');
var userManagementApiController = require('../ApiController/userManagementApiController');

apirouter.post('/login',userManagementApiController.login);

apirouter.get('/get_all_customers/:jwtToken',decodeAndAuthTokenJwtToken,userManagementApiController.get_all_customers);
//apirouter.get('/get_one_customer/:name/:jwtToken',decodeAndAuthTokenJwtToken,userManagementApiController.get_one_customer);

apirouter.put('/add_new_customer/:jwtToken',decodeAndAuthTokenJwtToken, userManagementApiController.add_new_customer);

apirouter.patch('/update_one_customer_info/:jwtToken',decodeAndAuthTokenJwtToken,userManagementApiController.update_one_customer_info);

apirouter.delete('/delete_one_customer_info/:name/:jwtToken',decodeAndAuthTokenJwtToken,userManagementApiController.delete_one_customer_info);


module.exports = apirouter;