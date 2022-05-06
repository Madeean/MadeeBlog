// const User = require('./model')
const bcrypt = require('bcryptjs')
const Artikel = require('../Artikel/model')
const User = require('../User/model')
const Komentar = require('../Komentar/model')
const Category = require('../Category/model')
var moment = require('moment');

module.exports={
    UserList: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            // const user = await User.find()
            const artikel = await Artikel.find().populate('category').populate('user')
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
            const artikel = await Artikel.findOne({_id:id}).populate('category').populate('user')
            const komentar = await Komentar.find({artikel:id}).populate('user_id')

            res.render('landing/detail',{
                session:req.session.user,
                artikel,
                moment:moment,
                alert,
                komentar
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

            res.redirect(`/view/${id}`)
            
            
            
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionKomentar:async(req,res)=>{
        try {
            console.log("masuk")
            const {id} = req.params;
            const {komentar} = req.body;
            let user_id = req.session.user.id
            let artikel = id
            const komen = await Komentar({user_id,artikel,komentar})
            komen.save()
            req.flash('alertMessage',`komentar berhasil dibuat`)
            req.flash('alertStatus', 'success')
            res.redirect(`/view/${id}`)
            
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewCategory:async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            const category = await Category.find()
            res.render('landing/category',{
                alert,
                session:req.session.user,
                category
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    }
}