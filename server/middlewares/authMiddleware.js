// const jwt = require('jsonwebtoken');




// module.exports = function(req,res,next){
//     try {
//         let token = req.header.authorization.split(' ')[1]
//         let verifiedToken = jwt.verify(token, `${process.env.SCREAT_FILE}`);

//         req.body.userId = verifiedToken.userId;

//         next()
//     } catch (error) {
//         res.send({
//             success: false,
//             message: "Invalid token"
//         })
//     }
    
     
// }

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let verifiedToken = jwt.verify(token, `${process.env.SCREAT_FILE}`);
    console.log(verifiedToken);

    req.body.userId = verifiedToken.userId;

     next();
  } catch (error) {
    res.send({
      success: false,
      message: "Invalid token",
    });
  }
};