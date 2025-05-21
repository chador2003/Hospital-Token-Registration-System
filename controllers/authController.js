const User = require('./../model/usermodel')
const Token = require('./../model/tokenModel')
const DoctorTUpdate = require('./../model/doctorTModel')

const CustomizeToken = require('./../model/customizeTModel')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const { promisify, isNullOrUndefined} = require('util')


const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) =>{
    const token = signToken(user._id)
    const cookieOptions ={
        expiresIn: new Date(
            Date.now()+process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    
    res.status(statusCode).json({
        status: "success",
        token,
        data:{
            user
        }
    })
}

exports.signup = async(req, res, next) => {
    try{
        const newUser = await User.create(req.body)
        createSendToken(newUser, 201, res)
     }
    catch(err){
    res.status(500).json({error: err.message});
}
}


exports.login = async (req, res, next) => {
    try {
        console.log(req.headers);
        const { cid: cidNumber, password } = req.body;  // here i am making cid as cidNumber

        // Check if the cidNumber and password exist
        console.log(req.body);
        if (!cidNumber || !password) {
            // alert(req.body)
            return next(new AppError('Please provide a cidNumber and password!', 400));
        }

        // Check if user exists
        const user = await User.findOne({ cidNumber }).select('+password');

        // If no user or password is incorrect, send error
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect cidNumber or password', 401));
        }

        // If everything's okay, send the token to client
        createSendToken(user, 200, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ========================= userprofile code ==============================
exports.protect = async (req, res, next) => {
    try {
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }
        if (!token) {
            return next(
                new AppError("You are not logged in! Please log in to get access.", 401)
            )
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        const freshUser = await User.findById(decoded.id)
        if (!freshUser) {
            return next(
                new AppError("The user belonging to this token no longer exists", 401)
            )
        }
        req.user = freshUser
        next()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// ===========================================================================
// ===================================== password update =================
exports.updatePassword = async (req, res, next) => {
    try {
        // console.log("updation")
        const user = await User.findById(req.user.id).select("+password")
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your current password is wrong", 401))
        }
        user.password = req.body.password
        user.passwordConfirm = req.body.passwordConfirm
        await user.save()
        createSendToken(user, 200, res)
        // next()
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// =====================================================================

exports.tokenc = async(req, res, next) => {
    try{
        const newToken = await Token.create(req.body)
        createSendToken(newToken, 201, res)
     }
    catch(err){
    res.status(500).json({error: err.message});
}
}

// =====================================================================
exports.DoctortUpdate = async(req, res, next) => {
    try{
        const new_updateToken = await DoctorTUpdate.create(req.body)
        createSendToken(new_updateToken, 201, res)
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

// =====================================================================
exports.tokenCustomize = async(req,res, next) => {
    try{
        const newCToken = await CustomizeToken.create(req.body)
        createSendToken(newCToken, 201, res)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

// ======================= updating token registration date & no of token ========
// exports.updateToken = async (req, res, next) => {
//     try{
//         const tokendetail = await CustomizeToken.findById(req.tokendetail.id).select('+noOfToken')
//         if (! (await tokendetail.correctNoOfToken(req.body.currentNoOfToken, tokendetail.noOfToken))){
//             return next(new AppError('Your current number of user is wrong', 401))
//         }
//         tokendetail.noOfToken = req.body.noOfToken
//         tokendetail.noOfTokenConfirm = req.body.noOfTokenConfirm

//         createSendToken(tokendetail, 200, res)
//     }
//     catch(err){
//         res.status(500).json({error:err.message})
//     }
// }