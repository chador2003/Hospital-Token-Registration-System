const express = require('express')
const CustomizeTController = require('./../controllers/CustomizeTController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/ctoken',authController.tokenCustomize)

// router.patch(
//     '/updateNoOfToken',
//     authController.updateToken,
// )

router
    .route('/')
    .get(CustomizeTController.getAllToken)
    .post(CustomizeTController.createToken)

router
    .route('/:id')
    .get(CustomizeTController.getToken)
    .patch(CustomizeTController.updateToken)
    .delete(CustomizeTController.deleteToken)

module.exports = router