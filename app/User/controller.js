const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports={
    UserList: async(req,res)=>{
        try {
            user_name = req.session.user
            if(user_name.role != "admin"){
                req.flash('alertMessage',`bukan admin`)
                req.flash('alertStatus', 'error')
                console.log(err);
                res.redirect('/')
            }else{
                const alertMessage = req.flash("alertMessage")
                const alertStatus = req.flash("alertStatus")
                const alert = {message:alertMessage, status:alertStatus}
                const user = await User.find()
                res.render('dashboard/user',{
                    session:req.session.user,
                    alert,
                    user
                });
            }
        } catch (err) {
            req.flash('alertMessage',`session abis`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
}