const express = require('express');
const router = express.Router();

const {creatUser,loginUser} = require('../Controller/usersController');
const {creatUserProfile,getUserProfile,getAllUsers} =require('../Controller/usersProfileController')
// const{creatQuestion}=require('../Controller/devloperTestController')
const {auth, student,admin} = require("../Middleware/auth");

router.post('/signup',creatUser);
router.post('/login',loginUser);
router.post('/profile',creatUserProfile);
router.get('/getProfile',getAllUsers)
router.get('/getCall',getUserProfile);
// router.post('/question',creatQuestion);

router.get("/test", auth, (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Welcome to the Protected route for TESTS',
        user: req.findUser, // Assuming req.findUser contains the decoded token
    });
});

//Protected Route
router.get("/student", auth, student, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
        isStudents: req.isStudents,
    });
} );

router.get("/admin", auth, admin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
        isAdmin: req.isAdmin,
    });
});

module.exports=router;