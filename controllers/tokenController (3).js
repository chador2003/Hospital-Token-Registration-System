const Token = require('./../model/tokenModel')

exports.getAllToken = async(req, res, next) => {
    try{
        const token = await Token.find()
        res.json({data:token, status: 'success'});
    }catch{
        res.status(500).json({error: err.message});
    }
}

exports.createToken = async (req, res) => {
    try{
        const token = await Token.create(req.body);
        res.json({data: token, status: "success"})
    } catch (err){
        res.status(500).json({error:err.message});
    }
}

exports.getToken = async (req, res) => {
    try{
        const token = await Token.findById(req.params.id);
        res.json({data: token, status: "success"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.updateToken = async (req, res) => {
    try{
        const token = await Token.findByIdAndUpdate(req.params.id, req.body);
        res.json({data:token, status: "success"})
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteToken = async(req, res) => {
    try{
        const token = await Token.findByIdAndDelete(req.params.id);
        res.json({data: token, status: "success"});

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}