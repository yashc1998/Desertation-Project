const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  //Getting token from the header
  const token = req.header("x-auth-token");

  //Check if token is not there
  if (!token) {
    return res.status(401).json({ msg: "Authorization error" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded)
    if(decoded.user){
      req.user = decoded.user;
      req.type = 'learner'
    }
    else if(decoded.instructor){
      req.user = decoded.instructor
      req.type = 'instructor'
      
      // console.log(req)
    }
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
