const express = require("express");
const doctorTController = require('./../controllers/doctorTController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.post('/DoctortUpdate', authController.DoctortUpdate)

router
    .route('/') // This corresponds to /api/v1/doctortoken
    .get(doctorTController.getAllToken)
    .post(doctorTController.createToken);

router
    .route('/:id')
    .get(doctorTController.getToken)
    .patch(doctorTController.updateToken)
    .delete(doctorTController.deleteToken);

module.exports = router;
