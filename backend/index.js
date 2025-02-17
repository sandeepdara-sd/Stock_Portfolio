import e from 'express'
import mongoose from 'mongoose'
import srouter from './routes/Stock-Router.js'
import router from './routes/User-Router.js'
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config();


const app = e()


app.use(cors())
app.use(cookieParser())
app.use(e.json())

app.use("/stock",srouter)
app.use("/user",router)

app.use("/",(req,res)=>{
    res.send("Welcome to stock api")
})


mongoose.connect(`${process.env.DB_URL}`)
.then(()=>{
    app.listen(5000)
    console.log("Connected at port 5000");
    
})
.catch((e)=>console.log(e))
