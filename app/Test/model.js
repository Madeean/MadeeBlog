const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
},{timestamps:true})

module.exports = mongoose.model('User', userSchema)