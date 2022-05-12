const Like = require('./model')
const Artikel = require('../Artikel/model')
module.exports={
    actionLike:async(req,res)=>{
        try {
            const{id} = req.params;
            const {aidi} = req.query;
            let artikel = id

            const sudah_like_belum = await Like.findOne({_id:artikel})
            if(sudah_like_belum.like == '0'){


                let update_like = 1
                const liked = await Like.findOneAndUpdate({_id:artikel},{
                    like:update_like
                })
                res.redirect(`/view/${aidi}`)
            }else if(sudah_like_belum.like == '1'){

                let update_like = 0
                const liked = await Like.findOneAndUpdate({_id:artikel},{
                    like:update_like
                })
                res.redirect(`/view/${aidi}`)
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
}