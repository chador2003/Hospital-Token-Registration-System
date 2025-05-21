const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router.get('/', viewsController.getHome)

router.get('/home2', authController.protect, viewsController.getHome2)
router.get('/home3', viewsController.getHome3)
// router.get('/home2', viewsController.getHome2 )
router.get('/login', viewsController.getLoginForm)
router.get('/login2', viewsController.getLoginForm2)
router.get('/signup', viewsController.getSignUpForm)

router.get('/tokenReg', viewsController.getTokenR)

router.get('/doctor1', viewsController.getDoctor1)
router.get('/D1', viewsController.getD1)
router.get('/me', authController.protect, viewsController.getProfile)
router.get('/realtimeupdate1', viewsController.getRealtimeUpdate)

router.get('/dashboard1', viewsController.getDashboard1)
router.get('/editdashboard', viewsController.getDashboardedit)
router.get('/dbfeedback', viewsController.getDashboardFeedback)
router.get('/dbactive', viewsController.getDashboardactivate)
// router.get('/me', viewsController.getProfile)

module.exports = router
