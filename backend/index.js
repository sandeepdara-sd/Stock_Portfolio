import e from 'express'
import mongoose from 'mongoose'
import router from './routes/Stock-Router.js'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config(); 


const app = e()
app.use(cors())
app.use(e.json())

app.use("/",router)

app.use("/",(req,res)=>{
    res.send("Welcome to the stock API")
})
mongoose.connect(`${process.env.DB_URL}`)
.then(()=>{
    app.listen(5000)
    console.log("Connected at port 5000");
    
})
.catch((e)=>console.log(e))
