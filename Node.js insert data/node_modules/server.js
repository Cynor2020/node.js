const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000
const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb is connected")
})

const userSchema = new mongoose.Schema({
    user_name:String,
    email:String
})
const Users = mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    console.log("ok")
    res.sendFile(path.join(__dirname,'form.html'))
})


app.post('/post', async(req , res)=>{
    const {user_name , email} = req.body
    const user = new Users({
        user_name,
        email
    })
    await user.save()
    console.log(user)
    res.send("Data submit success")
})


app.listen(port,()=>{
    console.log("ok")
})