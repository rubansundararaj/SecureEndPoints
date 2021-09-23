const fs = require("fs");
const {createJWT} = require('./../utils/auth');

exports.login = (req,res) => {
    try
    {
        var user_info = 
        {
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
        }
        console.log(user_info);   
        if(user_info["userEmail"].toLowerCase())
        {  
            const jwt_token =  createJWT(user_info.userEmail,user_info.userPassword);
            return res.status(200).send({message : jwt_token});
        }
    }
    catch(e)
    {
        //console.log(e);
        var message = {message : e} 
        return res.status(500).send(message);  
    }
}




exports.get_all_customers = (req,res,next) => {    
    try{
        fs.readFile("./customer.json", "utf8", (err, jsonString) => {
            var stringifiedJson = JSON.parse(jsonString);
            return res.status(200).send(stringifiedJson); 
          });
    }
    catch(e)
    {
        console.log(e);
        return res.status(400).send({message : "Error getting data"});  
    }
}


exports.get_one_customer = (req,res,next) => {    
    try{
        fs.readFile("./customer.json", "utf8", (err, jsonString) => {
            var stringifiedJson = JSON.parse(jsonString);
            (stringifiedJson).forEach(element => {
                if(element.name === req.params.name){
                    return res.status(200).send(element); 
                }
                console.log(element);
            });
            
          });
    }
    catch(e)
    {
        console.log(e);
        return res.status(400).send({message : "Error getting data"});  
    }
}

exports.add_new_customer = (req,res,next) => { 
    try{
        var customer_object = {
            "name": req.body.name, "profession" : req.body.profession
        }
        console.log(customer_object)
        fs.readFile("./customer.json", "utf8", (err, jsonString) => {
            var stringifiedJson = JSON.parse(jsonString);
            console.log(stringifiedJson.length);
            stringifiedJson.push(customer_object);
            updatedData = stringifiedJson;
            console.log(updatedData);

           fs.writeFile("./customer.json", JSON.stringify(stringifiedJson), err => {
            if (err) {
                return res.status(400).send({message : "Error updating"});  
            }           
          });
     
        });
        return res.status(200).send({message : "Updated"});  
        
    }
    catch(e)
    {
        console.log(e);
        return res.status(400).send({message : "Error updating"});  
    }
}

exports.update_one_customer_info = (req,res,next) => {
    try{
        fs.readFile("./customer.json", "utf8", (err, jsonString) => {
            var stringifiedJson = JSON.parse(jsonString);
            for(var i = 0; i < stringifiedJson.length; i++)
            {
                console.log(stringifiedJson[i].name +"   "+ req.body.name)
                if(stringifiedJson[i].name === req.body.name){
                    stringifiedJson.pop(i);
                    var newUser =   {"name": req.body.name, "profession" : req.body.profession}
                    stringifiedJson.push(newUser);
                    console.log("match found breadking out: " +i)
                    
                    fs.writeFile("./customer.json", JSON.stringify(stringifiedJson), err => {
                        if (err) {
                            return res.status(400).send({message : "Error updating"});  
                        }
                      });
                    break;
                }

                console.log(i);
            }
          });

         

          return res.status(200).send({message : "Updated"});   

    }
    catch(e)
    {
        console.log(e);
        return res.status(400).send({message : "Error updating"});  
    }
}

exports.delete_one_customer_info = (req,res,next) => {
    try{

        fs.readFile("./customer.json", "utf8", (err, jsonString) => {
            var stringifiedJson = JSON.parse(jsonString);
            for(var i = 0; i < stringifiedJson.length; i++)
            {
                console.log(stringifiedJson[i].name);
                if(stringifiedJson[i].name === req.params.name)
                {
                    const index = stringifiedJson.indexOf(stringifiedJson[i].name);
                    stringifiedJson.splice(index,1);
                    fs.writeFile("./customer.json", JSON.stringify(stringifiedJson), err => {
                        if (err) {
                            return res.status(400).send({message : "Error deleting"});  
                        }
                      });
                    break;
                }

                console.log(i);
            }
          });

          

          return res.status(200).send({message : "Deleted"});   

    }
    catch(e)
    {
        console.log(e);
        return res.status(400).send({message : "Error deleting"});  
    }
}