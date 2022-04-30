const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports={
    UserList: async(req,res)=>{
        try {
            // const alertMessage = req.flash("alertMessage")
            // const alertStatus = req.flash("alertStatus")
            // const alert = {message:alertMessage, status:alertStatus}
            // const user = await User.find()
            res.render('index');
        } catch (err) {
            // req.flash('alertMessage',`${err.message}`)
            // req.flash('alertStatus', 'danger')
            console.log(err);
            res.redirect('/')
        }
    },
}