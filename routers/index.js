const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.LandingPage)
router.get('/signup', Controller.getSignUp)
router.post('/signup', Controller.postSignUp)
router.get('/signin', Controller.getSignIn)
router.post('/signin', Controller.postSignIn)
router.get('/userprofile', Controller.getProfile)
router.get('/userprofile/:id/detail', Controller.userDetail)
router.get('/userprofile/:id/edit', Controller.getEditUser)
router.post('/userprofile/:id/edit', Controller.postEditUser)
router.get('/home', Controller.home) 
router.get('/company', Controller.getListCompany) 
router.get('/company/:id/buy', Controller.buyStock) 
router.get('/company/:id/sell', Controller.sellStock) 
router.get('/company/:id/delete', Controller.deleteCompany) 
router.get('/signout', Controller.getSignOut)

module.exports = router

