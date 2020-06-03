const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
  
    username:{
        type:String,
        required:true,
        min:4,
        max:150,
    },
    
    email:{
        type:String,
        required:true,
        min:6,
        max:150,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:250
    },
    date:{
        type:String
    }
},{
    collection:'expense-manager-users'
})

module.exports = mongoose.model('User',User)