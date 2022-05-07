const Like = require('./model')
module.exports={
    actionLike:async(req,res)=>{
        try {
            console.log("masoooook bang")
            const{id} = req.params;
            const {aidi} = req.query;
            console.log(aidi)
            let artikel = id

            const sudah_like_belum = await Like.findOne({_id:artikel})
            console.log(sudah_like_belum)
            if(sudah_like_belum.like == '0'){
                console.log("like 0")

                let update_like = 1
                const liked = await Like.findOneAndUpdate({_id:artikel},{
                    like:update_like
                })
                console.log("like berubah")
                res.redirect(`/view/${aidi}`)
            }else if(sudah_like_belum.like == '1'){
                console.log("like 1")
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