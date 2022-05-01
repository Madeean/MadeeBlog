
const bcrypt = require('bcryptjs')
module.exports={
    dashboard: async(req,res)=>{
        try {
            res.render('dashboard/index',{
                session:req.session.user,
            })
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
}