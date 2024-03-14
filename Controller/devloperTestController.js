const devloperTest = require("../Schema/DevloperTest");


exports.creatQuestion = async (req, res) => {
    try {
      const { company, category, question } = req.body;
    //   const findEmail = await user.findOne({ email });
      
    
  
      const response = await devloperTest.create({
        company,
        category,
        question,
      });
      res.status(200).json({
        status: "success",
        data: response,
        message: "successfully creat question on db",
      });
      
  
      
    } catch (error) {
      res.status(500).json({
        status: "false",
        data: response,
        message: "Some thing went to wrong",
      });
      console.log(error);
    }
  };