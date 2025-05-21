const Updatetoken = require('./../model/doctorTModel')

exports.getAllToken = async(req, res, next) => {
    try{
        const token = await Updatetoken.find()
        res.json({data:token, status: 'success'});
    }catch{
        res.status(500).json({error: err.message});
    }
}

exports.createToken = async (req, res) => {
    try{
        const token = await Updatetoken.create(req.body);
        res.json({data: token, status: "success"})
    } catch (err){
        res.status(500).json({error:err.message});
    }
}

exports.getToken = async (req, res) => {
    try{
        const token = await Updatetoken.findById(req.params.id);
        res.json({data: token, status: "success"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.updateToken = async (req, res) => {
    try{
        const token = await Updatetoken.findByIdAndUpdate(req.params.id, req.body);
        res.json({data:token, status: "success"})
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteToken = async(req, res) => {
    try{
        const token = await Updatetoken.findByIdAndDelete(req.params.id);
        res.json({data: token, status: "success"});

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}