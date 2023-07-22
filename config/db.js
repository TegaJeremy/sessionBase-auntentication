const dotenv = require('dotenv').config()
const mongoose = require ('mongoose')

mongoose.connect(process.env.url).then(()=>{
    console.log('connected to database successfilly')
    
}).catch((error)=>{
 console.log(error.message)
})