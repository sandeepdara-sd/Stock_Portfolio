import mongoose from 'mongoose'

const schema = mongoose.Schema

const stockSchema = new schema({
    
    ticker:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    buyprice:{
        type:Number,
        required:true
    },
    
    quantity:{
        type:Number,
        required:true,
        default: 1,
    }

})

export default mongoose.model('Stock', stockSchema)