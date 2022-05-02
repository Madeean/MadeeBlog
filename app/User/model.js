const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
    email:{
        type:String,
        require:[true,"email tidak boleh kosong"]
    },
    password:{
        type:String,
        require:[true,"password tidak boleh kosong"]
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    active:{
        type:String,
        enum:['1','0'],
        default:'1'
    },
    


},{timestamps:true})

module.exports = mongoose.model('User', userSchema)