const mongoose = require('mongoose')

let artikelSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    judul:{
        type:String,
        require:[true,"judul tidak boleh kosong"]
    },
    body:{
        type:String,
        require:[true,"body tidak boleh kosong"]
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:[true,"category tidak boleh kosong"]
    },
    views:{
        type:Number,
    },
    like:{
        type:Number,
    }
},{timestamps:true})

module.exports = mongoose.model('Artikel', artikelSchema)