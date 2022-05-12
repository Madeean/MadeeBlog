const Artikel = require('../Artikel/model')
const Like = require('../Like/model')
const bcrypt = require('bcryptjs')
module.exports={
    dashboard: async(req,res)=>{
        try {
            let session_id = req.session.user.id
            const artikel  = await Artikel.find({user:session_id}).count()
            const like = await Like.find({pembuat:session_id,like:'1'}).count()
            const pembaca = await Artikel.find({user:session_id})
            let hasil = 0;
            for(let i = 0; i<pembaca.length; i++){
                hasil += pembaca[i].views
            }

            res.render('dashboard/index',{
                artikel,
                session:req.session.user,
                like,
                hasil
            })
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
}