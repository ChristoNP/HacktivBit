const {User, Profile, Category, Company, Investment} =  require("../models")
const bcrypt = require('bcryptjs')

class Controller{
    static async LandingPage(req,res){
        try {
            res.render('landingpage')
        } catch (error) {
            res.send(error)          
        }
    }   
    static async getSignUp(req,res){
        try {
            res.render('registerform')
        } catch (error) {
            res.send(error)
            
        }
    }
    static async postSignUp(req,res){
        try {
            const {email, password} = req.body
           let new_user = await User.create({email, password})
           await Profile.create({UserId: new_user.id})
            res.redirect('/signin')
        } catch (error) {
            res.send(error)         
        }
    }

    static async getSignIn(req,res){
        try {
            const {error} = req.query
            res.render('loginform', {error})
        } catch (error) {
            res.send(error)         
        }
    }

    static async postSignIn(req,res){
        try {
            const {email, password} = req.body
            let dataUser = await User.findOne({
                where: {email}
            })
            if (dataUser) {
                const isValidPassword = bcrypt.compareSync(password, dataUser.password)
                if (isValidPassword) {
                    req.session.UserId = dataUser.id
                    req.session.role = dataUser.role
                    return res.redirect('/home')
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/signin?error=${error}`)
                }
            } else {
                const error = 'invalid username/password'
                return res.redirect(`/signin?error=${error}`)
            }
        } catch (error) {
            res.send(error)         
        }
    }

    static async getProfile(req,res){
        try {
            
        } catch (error) {
            res.send(error)         
        }
    }

    static async userDetail(req,res){
        try {
            
        } catch (error) {
            res.send(error)         
        }
    }

    static async getEditUser(req,res){
        try {
            let data = await User.findAll()
            res.render('showFormEdit', {data})
        } catch (error) {
            res.send(error)         
        }
    }

    static async postEditUser(req,res){
        try {
            const{name, phoneNumber} = req.body
            await User.create ({name, phoneNumber})
            res.redirect('showFormEdit')
        } catch (error) {
            res.send(error)         
        }
    }
    static async home(req,res){
        try {
            res.render('home')
        } catch (error) {
            res.send(error)         
        }
    }
    static async getListCompany(req,res){
        try {
            let data = await Company.findAll()
            res.render('company', {data})
        } catch (error) {
            res.send(error)         
        }
    }

    static async buyStock(req,res){
        try {
            
        } catch (error) {
            res.send(error)         
        }
    }

    static async sellStock(req,res){
        try {
            
        } catch (error) {
            res.send(error)         
        }
    }

    static async deleteCompany(req,res){
        try {
            
        } catch (error) {
            res.send(error)         
        }
    }
    static async getSignOut(req,res){
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/signin')
                }
            })
        } catch (error) {
            res.send(error)         
        }
    }
}

module.exports = Controller