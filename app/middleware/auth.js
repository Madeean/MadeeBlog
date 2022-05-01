module.exports ={
    isLoginAdmin:(req,res,next)=>{
        if(req.session.user === null || req.session.user == undefined){
            req.flash('alertMessage',`Silahkan login terlebih dahulu`)
            req.flash('alertStatus', 'error')
            res.redirect('/')
        }else{
            next()
        }
    }
}