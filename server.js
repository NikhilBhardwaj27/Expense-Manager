const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expenseRoute = require('./src/routes/api/expenseRoute')
const userRoute = require('./src/routes/api/userRoute')
const bodyParser = require('body-parser')
const path =  require('path')


dotenv.config()

// connecting to db
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true,
    useUnifiedTopology: true,},
    (err)=>{
        if(err){
            console.log(err)
        }
    }
)

// Middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use('/routes/api',expenseRoute)
app.use('/routes/api',userRoute)


// If app is running in production then do this
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}


app.listen(8000,()=>{console.log('Server is running on port 8000')})