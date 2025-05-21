const Token = require('./../model/customizeTModel')

exports.getAllToken = async(req, res, next) => {
    try {
        const ctoken = await Token.find()
        res.status(200).json({data:ctoken, status: 'success'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.createToken = async (req, res) => {
    try{
        const ctoken = await Token.create(req.body);
        console.log(req.body.name);
        res.json({data: ctoken, status: 'success'})
    } catch (err){
        res.status(500).json({error: err.message})
    }
}

exports.getToken = async(req, res) => {
    try{
        const ctoken = await Token.findById(req.params.id);
        res.json({data:ctoken, status:'success'})
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.updateToken = async(req, res) => {
    try{
        const ctoken = await Token.findByIdAndUpdate(req.params.id, req.body)
        res.json({data: ctoken, status:'success'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.deleteToken = async(req, res) => {
    try {
        const ctoken = await Token.findByIdAndDelete(req.params.id);
        res.json({data:ctoken, staus:"success"})
    } catch(err){
        res.status(500).json({error: err.message})
    }
}