// const User = require('./model')
const Artikel = require('../Artikel/model')
const bcrypt = require('bcryptjs')
var moment = require('moment');

module.exports={
    UserList: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            // const user = await User.find()
            const artikel = await Artikel.find().populate('category').populate('user_id')
            res.render('index',{
                session:req.session.user,
                alert,
                artikel,
                moment:moment
            });
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    detailArtikel:async(req,res)=>{
        try {
            const {id} = req.params;
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            const artikel = await Artikel.findOne({_id:id}).populate('category').populate('user_id')

            res.render('landing/detail',{
                session:req.session.user,
                artikel,
                moment:moment,
                alert
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    incrementViews:async(req,res)=>{
        try {
            const {id} = req.params;
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            const viewss = await Artikel.findOne({_id:id})
            let increment = viewss.views + 1
            console.log(increment)
            await Artikel.findOneAndUpdate({_id:id},{
                views:increment
            })
            console.log("bisa")
            // const artikel = await Artikel.findOne({_id:id}).populate('category').populate('user_id')
            // console.log("BISA")

            res.redirect(`/${id}`)
            
            
            
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    }
}