const Artikel = require('../Artikel/model')
const bcrypt = require('bcryptjs')
module.exports={
    dashboard: async(req,res)=>{
        try {
            let session_id = req.session.user.id
            const artikel  = await Artikel.find({user_id:session_id}).count()
            console.log(artikel)
            res.render('dashboard/index',{
                artikel,
                session:req.session.user,
            })
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
}