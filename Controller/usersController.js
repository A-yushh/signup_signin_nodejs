const user = require("../Schema/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config();
// const userProfile = require('../Schema/usersProfile');

exports.creatUser = async (req, res) => {
  try {
    const { email, password, phonNumber } = req.body;
    const findEmail = await user.findOne({ email });
    if (findEmail) {
      return res.status(400).json({
        status: "false",
        message: "User All ready exit",
      });
    } else {
    var hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
      console.log("hash password:", hashPassword);
    } catch (err) {
      console.log(err);
    }

    const response = await user.create({
      email,
      password: hashPassword,
      phonNumber,
    });
    res.status(200).json({
      status: "success",
      data: response,
      message: "successfully creat Users on db",
    });
    }

    
  } catch (error) {
    res.status(500).json({
      status: "Un success",
      data: response,
      message: "Some thing went to wrong",
    });
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find email in database exist or not
    const findUser = await user.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      // User not found
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    //get password and dcrypt password return true if password is match
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    console.log('isPasswordValid',isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    } else {
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        userId: findUser.id,
        useremail: findUser.email,
        
        // role: findUser.role,
        password: password,
        // role:"User"
      };
      console.log(payload);
      // Creat a JWT toket
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      // send Token in headers

      res.header("Authorization", `Bearer ${token}`);

      // send token in cookies

      //   res.cookie('token', token, { httpOnly: true});


      // findUser = findUser.toObject();
      // findUser.token = token;
      findUser.password = undefined;
      console.log(token);
      res.status(200).json({
        status: "success",
        token: token,
        findUser,
        
        message: "successfully login user",
      });
      // Decode the token and Varify by secretkey
      const varifyToken = jwt.verify(token, secretKey);
      console.log("varify token data", varifyToken);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to process the request",
    });
  }
};
