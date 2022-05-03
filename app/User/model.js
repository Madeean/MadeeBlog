const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
    email:{
        type:String,
        unique: true,
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
    artikel:{
        type:Number,
        default:0
    },
    pembaca:{
        type:Number,
        default:0
    },
    like:{
        type:Number,
        default:0
    }
    


},{timestamps:true})

module.exports = mongoose.model('User', userSchema)