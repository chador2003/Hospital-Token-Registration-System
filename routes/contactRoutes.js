const express = require('express')
const contactController = require('./../controllers/contactController')
// const authController = require('./../controllers/authController')
const router = express.Router()


router 
    .route('/')
    .get(contactController.getAllContact)
    .post(contactController.createContact)

router
    .route('/:id')
    .get(contactController.getContact)
    .delete(contactController.deleteContact)

module.exports = router