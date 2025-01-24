import mongoose from 'mongoose'

const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    stocks:[{
        type:mongoose.Types.ObjectId, 
        ref: 'Stock',
        required:true
    }]
})

export default mongoose.model('User',userSchema)