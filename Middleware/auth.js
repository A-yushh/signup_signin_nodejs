const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

exports.auth = (req, res, next) => {
  // const cookieToken = req.cookies.token;

  const tokenHeader = req.headers.authorization;
  const fromHeader = tokenHeader.split(" ")[1];
  // const token = req.body.token;
  // console.log(token)
  console.log(fromHeader);
  try {
    if (!fromHeader) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }
    const JWT_SECRET = process.env.SECRET_KEY;
    try {
      const varifyToken = jwt.verify(fromHeader, JWT_SECRET);
      console.log("myhh ", varifyToken);

      req.findUser = varifyToken;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      success: false,
      message: "Some thing went to wrong",
    });
  }
};

exports.student = (req, res, next) => {
  console.log(req.findUser.role);
  try {
    if (req.findUser.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "THis is a protected route for students",
      });
    }else {
        req.Student = true; // You can use req.isAdmin in the next middleware or route handler
        next();
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};

exports.admin = (req, res, next) => {
  try {
    if (req.findUser.role !== "Admin") {
      return res.status(401).json({
        success: true,
        message: "THis is a protected route for admin",
      });
    } else {
        req.isAdmin = true; // You can use req.isAdmin in the next middleware or route handler
        next();
    }
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not addmin matching",
    });
  }
 
};
