const express = require('express');

const mongoose = require('mongoose')
const  PORT = 5544;
const session = require('express-session')

const db = require("./config/db")
const router = require("./router/userrouter")
const recordrouter = require('./router/recordRouter')
const app = express();
app.use (express.json());




app.use(
    session({
        secret:process.env.SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge: 60*60 * 1000,
        },
    })
)
app.use('/api',router)
app.use('/api', recordrouter)

app.listen(PORT, ()=>{
    console.log(`app has listed to ${PORT}`)
});
// mongoose.connect(process.env.url).then(()=>{
//     console.log('connected to database successfilly')
    
// }).catch((error)=>{
//  console.log(error.message)
// })


// ATLAS_PASSWORD =svYkuLO57gzTrEZM
// ATLAS_USERNAME = oghenedemartin
// const url = `mongodb+srv://oghenedemartin:svYkuLO57gzTrEZM@cluster0.pemc4tv.mongodb.net`
// mongoose.connect(url).then(()=>{
//     console.log("connected successfully")
// }).catch((err)=>{
//     console.log(err.message)
// })