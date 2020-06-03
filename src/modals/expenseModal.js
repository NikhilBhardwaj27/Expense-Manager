const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Expense = new Schema({
    UserId:{
        type:String,
        required:true
    },
    ItemName:{
        type:String,
        required:true,
        max:120
    },
    ItemAmount:{
        type:Number,
        required:true,
    },
    ItemCategory:{
        type:String,
        required:true,
        max:50
    },
    date:{
        type:String
    }
},{
    collection:'expense-manager'
})

module.exports = mongoose.model('Expense',Expense)