const dotenv = require('dotenv');
const userProfile = require("../Schema/usersProfile");
const jwt = require("jsonwebtoken");
dotenv.config();
exports.creatUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, address} = req.body;
    const tokenHeader = req.headers.authorization;
    const fromHeader = tokenHeader.split(' ')[1];
    const secretKey = process.env.SECRET_KEY;
    const varifyToken = jwt.verify(fromHeader, secretKey);
    const userId=varifyToken.userId;
    console.log(varifyToken);
    if(varifyToken){
      const response = await userProfile.create({
        firstName,
        lastName,
        address,
        userId,
      });
      res.status(200).json({
        success: "true",
        data: response,
        Message: "Profile Create Successfully",
      });

    }
    
    
  } catch (err) {
    res.status(500).json({
      success: "false",
      Message: "you can't  Create profile try again",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const userDetails = await userProfile.find().populate("userId");
  res.status(200).json({
    success: "true",
    data: userDetails,
  });
};

exports.getUserProfile = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    // Get Token from cookie and headers
    // const token = req.cookies.token;
    const tokenHeader = req.headers.authorization;
    const fromHeader = tokenHeader.split(' ')[1];
    console.log(token);
    console.log("header token",fromHeader);

    // Decode token and Varify its
    const secretKey = process.env.SECRET_KEY;
    const varifyToken = jwt.verify(token, secretKey);
    console.log(varifyToken);

    // for the pagination using pipe line and skip and limit
      const startIndex = (page - 1) * limit;
      const allUser = await userProfile.find();
      const user = await userProfile.find().skip(startIndex).limit(limit);
    //   const user = await userProfile.aggregate([
    //     { $skip: startIndex },
    //     { $limit: parseInt(limit) },
    //   ]);
    //   res.status(200).json({
    //     success: "true",
    //     length: allUser.length,
    //     data: user,
    //   });
  } catch (err) {
    console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to process the request',
        });
  }
};
