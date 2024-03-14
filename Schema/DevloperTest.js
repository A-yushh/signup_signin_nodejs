const mongoose = require('mongoose')

const devloperTest=mongoose.Schema({
    
    company:{
        type:'string',
        required:true,
    },
    category:{
        type:'string',
        required:true
    },
    question:{
        type:'Array',
        required:true
    },

    dateTime: {
        type: Date,
        default: Date.now,
      },
})

module.exports=mongoose.model('DevloperTest',devloperTest);