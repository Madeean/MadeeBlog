// const User = require('./model')
const bcrypt = require('bcryptjs')
const Artikel = require('../Artikel/model')
const User = require('../User/model')
const Komentar = require('../Komentar/model')
const Category = require('../Category/model')
const Like = require('../Like/model')
var moment = require('moment');

module.exports={
    UserList: async(req,res)=>{

        try {
            const berapa = req.query.berapa || 5 ;
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}


            const artikel = await Artikel.find().populate('category').populate('user').limit(berapa)
            
            res.render('index',{
                session:req.session.user,
                alert,
                artikel,
                moment:moment,
                query:berapa
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
            if(req.session.flash == undefined || req.session.flash == null || req.session.user){
                let session_id = req.session.user.id
                const suka = await Like.findOne({user_id:session_id,artikel:id}).populate('user_id').populate('artikel')
                res.render('landing/detail',{
                    session:req.session.user,
                    artikel,
                    moment:moment,
                    alert,
                    komentar,
                    suka
                })
            }else{
                res.render('landing/detail',{
                    session:req.session.user,
                    artikel,
                    moment:moment,
                    alert,
                    komentar,
                    
                })
            }
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
            let hartikel = id
            const artikel = await Artikel.findOne({_id:id})
            if(req.session.flash == undefined || req.session.flash == null || req.session.user){

                let session_id = req.session.user.id
                const like = await Like.findOne({user_id:session_id, artikel:hartikel,pembuat:artikel.user})
                if(!like){
                    const suka = await Like({user_id:session_id,artikel:hartikel,pembuat:artikel.user})
                    suka.save()
                }
                
            }
            const viewss = await Artikel.findOne({_id:id})
            let increment = viewss.views + 1

            await Artikel.findOneAndUpdate({_id:id},{
                views:increment
            })


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
    },
    viewArtikelCategory:async(req,res)=>{
        try {
            const {name} = req.params
            const category = await Category.findOne({name:name})
            const artikel = await Artikel.find({category:category._id}).populate('category').populate('user')
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            res.render('landing/viewArtikelCategory',{
                alert,
                session:req.session.user,
                artikel,
                moment:moment,
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewPopular:async(req,res)=>{
        try {
            const artikel = await Artikel.find().sort({views:-1}).populate('category').populate('user')
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            res.render('landing/viewArtikelCategory',{
                alert,
                session:req.session.user,
                artikel,
                moment:moment,
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    }
}