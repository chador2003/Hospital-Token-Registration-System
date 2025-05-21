const AppError = require('../utils/appError');
const User = require('./../model/usermodel');
const path = require('path')
const multer = require('multer')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find();
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deactivate = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: user, status: "success" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        const filteredBody = filterObj(req.body, 'name', 'email');
        const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ status: 'success', data: { user: updateUser } });
    } catch (err) {
        res.status(500).json({ error: err.message });
        return next(new AppError(err.message, 500));
    }
};

exports.updateMe = async (req, res, next) => {
    try {
        if (req.body.password || req.body.passwordConfirm) {
            return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
        }
        // 2) Filter out unwanted fields name sthat are not alowed
        const filteredBody = filterObj(req.body, 'name', 'email')
        if(req.body.photo !== 'undefined'){
            filteredBody.photo = req.file.filename 
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const muleterStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'views/assets/img/users')
    },
    filename:(req, file,cb) => {
        // var obj = JSON.parse(req.cookies.token)
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
    }
})
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else{
        cb(new AppError('Not an image! please upload only images', 400), false)
    }
}
const upload = multer({
    storage: muleterStorage,
    fileFilter: multerFilter,
})

exports.uploadUserPhoto = upload.single('photo')