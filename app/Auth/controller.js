const User = require('../User/model')
const bcrypt = require('bcryptjs')

module.exports={
    viewSignin: async(req,res) => {
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            if(req.session.user === null || req.session.user == undefined){
                res.render('auth/login',{session:req.session.user,alert})
            }else{
                req.flash('alertMessage',`Anda sudah login`)
                req.flash('alertStatus', 'error')
                res.redirect('/dashboard')
            }

        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err)
            res.redirect('/')
        }
    },
    viewRegister: async(req,res) => {
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            if(req.session.user === null || req.session.user == undefined){
                res.render('auth/register',{session:req.session.user,alert})
            }else{
                req.flash('alertMessage',`Anda sudah login`)
                req.flash('alertStatus', 'error')
                res.redirect('/dashboard')
            }

        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err)
            res.redirect('/')
        }
    },
    actionSignin:async(req,res)=>{
        try {
            const {email,password} = req.body
            const check = await User.findOne({email:email})
            if(check){
                const checkPassword = await bcrypt.compare(password,check.password)
                if(checkPassword){
                    req.session.user={
                        id:check._id,
                        email:check.email,
                        role:check.role,
                        name:check.name
                    }
                    console.log("sukses login");
                    res.redirect('/dashboard')
                }else{
                    req.flash('alertMessage',`Data salah`)
                    req.flash('alertStatus', 'error')
                    console.log("data salah");
                    res.redirect('/login')
                }
            }else{
                req.flash('alertMessage',`Data salah`)
                req.flash('alertStatus', 'error')
                console.log("data salah");
                res.redirect('/login')
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionRegister:async(req,res)=>{
        try {
            const {name,email,password} = req.body
            const check = await User.findOne({email:email})
            if(check){
                req.flash('alertMessage',`email sudah terdaftar silahakan ganti dengan yg lain`)
                req.flash('alertStatus', 'error')
                console.log("email sudah terdaftar silahakan ganti dengan yg lain");
                res.redirect('/register')
            }else{
                const salt = await bcrypt.genSalt()
                let user = await User({name,email,password})
                user.password =  await bcrypt.hash(password,salt)
                await user.save();
                req.flash('alertMessage',`akun telah dibuat`)
                req.flash('alertStatus', 'success')
                res.redirect('/login')
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    logOut:(req,res)=>{
        req.session.destroy();
        res.redirect('/');
    }

}