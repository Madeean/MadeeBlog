const mongoose = require('mongoose')

let likeSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    artikel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Artikel'
    },
    like:{
        type:String,
        enum:['1','0'],
        default:'0'
        
    }
},{timestamps:true})

module.exports = mongoose.model('Like', likeSchema)