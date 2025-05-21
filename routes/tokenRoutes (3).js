const express = require("express")
const tokenController = require('./../controllers/tokenController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/Ctoken', authController.tokenc)

router
    .route('/')
    .get(tokenController.getAllToken)
    .post(tokenController.createToken)

router
    .route('/:id')
    .get(tokenController.getToken)
    .patch(tokenController.updateToken)
    .delete(tokenController.deleteToken)

module.exports = router