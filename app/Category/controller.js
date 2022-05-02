const Category = require('./model')
module.exports={
    categoryList: async(req,res)=>{
        try {
            user_name = req.session.user.role
            if(user_name != "admin"){
                req.flash('alertMessage',`bukan admin`)
                req.flash('alertStatus', 'error')
                console.log(err);
                res.redirect('/')
            }else{
                const alertMessage = req.flash("alertMessage")
                const alertStatus = req.flash("alertStatus")
                const alert = {message:alertMessage, status:alertStatus}
                const category = await Category.find()
                res.render('category/index',{
                    session:req.session.user,
                    alert,
                    category
                });
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionCreate: async(req,res)=>{
        try {
            const{name} = req.body

            const category = await Category({name})
            category.save()
            req.flash('alertMessage',`category berhasil dibuat`)
            req.flash('alertStatus', 'success')
            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewEdit:async(req,res)=>{
        try {
            const {id} = req.params
            const category = await Category.findOne({_id:id})
            res.render('category/edit',{
                session:req.session.user,
                category
            });
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionEdit:async(req,res)=>{
        try {
            
            const {name} = req.body
            const {id} = req.params
            const category = await Category.findOneAndUpdate({_id:id},{name});
            category.save();
            req.flash('alertMessage', "Berhasil edit category")
            req.flash('alertStatus', "success")

            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionDelete:async(req,res)=>{
        try {
            
            const {id} = req.params
            const category = await Category.findOneAndRemove({_id:id});
            req.flash('alertMessage', "Berhasil menghapus category")
            req.flash('alertStatus', "success")

            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    }
}