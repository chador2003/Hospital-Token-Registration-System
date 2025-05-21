const Contact = require("../model/contactModel");


exports.getAllContact = async (req, res, next) => {
    try {
        const contact = await Contact.find();
        res.json({ data: contact, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.json({ data: contact, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.json({ data: contact, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.json({ data: contact, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
