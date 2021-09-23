const jwt = require("jsonwebtoken");



exports.createJWT = (email, userId) => 
{
   const payload = {
      email,
      userId
   };
   return jwt.sign(payload, "partOfTheJourneyIsTheEnd", {
     expiresIn: "1 day",
   });
};



// exports.decodeAndAuthTokenJwtToken =  async (req, res,next) => {
//     //we receive objectId of the sessionid and retirve the object id from db and verify it.
//     try{
//        console.log(req.params.jwtToken);
//        const decode = jwt.verify(req.params.jwtToken, "partOfTheJourneyIsTheEnd");
//        console.log(decode);
//        next();
//     }
//     catch(e)
//     {
//        throw new Error("Auth failed")
//       // return res.status(401).send({message: "Auth failed"});
//     }
    
//  }
 

 exports.decodeAndAuthTokenJwtToken =  async (req, res,next) => {
   //we receive objectId of the sessionid and retirve the object id from db and verify it.
  
  try{
   console.log("Hello " + req.params.jwtToken);
   jwt.verify(req.params.jwtToken, "partOfTheJourneyIsTheEnd");
   next();
  }
  catch(e)
  {
   return res.status(401).send({message: "Auth failed"});  
  }
};