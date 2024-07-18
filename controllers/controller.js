const {User, Profile, Category, Company, Investment} =  require("../models")

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
            const {email, password, role} = req.body
           let new_user = await User.create({email, password, role})
           await Profile.create({UserId: new_user.id})
            res.redirect('/signin')
        } catch (error) {
            res.send(error)         
        }
    }

    static async getSignIn(req,res){
        try {
            res.render('loginform')
        } catch (error) {
            res.send(error)         
        }
    }

    static async postSignIn(req,res){
        try {
            
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
            
        } catch (error) {
            res.send(error)         
        }
    }

    static async postEditUser(req,res){
        try {
            
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
            
        } catch (error) {
            res.send(error)         
        }
    }
}

module.exports = Controller