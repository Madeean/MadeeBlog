const mongoose = require('mongoose')

let komentarSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    komentar:{
        type:Text,
        require:[true,"teks harus diisi jika ingin berkomentar"],
    }
},{timestamps:true})

module.exports = mongoose.model('Komentar', komentarSchema)