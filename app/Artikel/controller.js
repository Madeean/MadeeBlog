const Category = require('../Category/model')
const User = require('../User/model')
const Artikel = require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
var moment = require('moment');
module.exports={
    artikelList: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            let session_id= req.session.user.id
            const artikel = await Artikel.find({user_id:session_id}).populate('category')
            

            res.render('artikel/index',{
                alert,
                artikel,
                session:req.session.user
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate: async(req,res)=>{
        try {

            const category = await Category.find()
            res.render('artikel/create',{
                category,
                session:req.session.user
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionCreate:async(req,res)=>{
        try {
            const {judul,category,body} = req.body;
            let user_id = req.session.user.id
            let views = 0
            let like = 0
            
            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1]
                let filename = req.file.filename+'.'+originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)
                src.pipe(dest)
                console.log(target_path)
                src.on('end',async()=>{
                    try {
                        const artikel = new Artikel({
                            user_id,judul,category,body,views,like,thumbnail:filename
                        })
                        await artikel.save()
                        req.flash('alertMessage', "Berhasil tambah artikel")
                        req.flash('alertStatus', "success")
                        
                        res.redirect('/artikel')
                    } catch (err) {
                        req.flash('alertMessage',`${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/artikel')
                    }
                })
            }else{
                const artikel = new Artikel({
                    user_id,judul,category,body,views,like
                })
                await artikel.save()
                req.flash('alertMessage', "Berhasil tambah artikel")
                req.flash('alertStatus', "success")
                
                res.redirect('/artikel')
            }
            
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/artikel')
        }
        
    },
    viewDetail:async(req,res)=>{
        try {
            const {id} = req.params;
            const artikel = await Artikel.findOne({_id:id}).populate('category')
            res.render('artikel/detail',{
                session:req.session.user,
                artikel,
                moment:moment
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/artikel')
        }
    },
    viewEdit: async(req,res)=>{
        try {
            const {id} = req.params
            const category = await Category.find()
            const artikel = await Artikel.findOne({_id:id}).populate('category')
            console.log(artikel.judul)
            res.render('artikel/edit',{
                category,
                artikel,
                session:req.session.user
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionEdit:async(req,res)=>{
        try {
            const {id} = req.params;
            const {judul,category,body} = req.body;
            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1]
                let filename = req.file.filename+'.'+originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)
                src.pipe(dest)
                src.on('end',async()=>{
                    try {
                        const artikel = await Artikel.findOne({_id:id})
                        let currentImage = `${config.rootPath}/public/uploads/${artikel.thumbnail}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage)
                        }
                        await Artikel.findOneAndUpdate({
                            _id:id
                        },{
                            judul,category,body,thumbnail:filename
                        })
                        await artikel.save()
                        req.flash('alertMessage', "Berhasil edit artikel")
                        req.flash('alertStatus', "success")
                        
                        res.redirect('/artikel')
                    } catch (err) {
                        req.flash('alertMessage',`${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/artikel')
                    }
                })
            }else{
                await Artikel.findOneAndUpdate({
                    _id:id
                },{
                    judul,category,body
                })

                req.flash('alertMessage', "Berhasil edit artikel")
                req.flash('alertStatus', "success")
                
                res.redirect('/artikel')
            }
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
            const artikel = await Artikel.findOneAndRemove({_id:id});
            req.flash('alertMessage', "Berhasil menghapus artikel")
            req.flash('alertStatus', "success")

            res.redirect('/artikel');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    }
}