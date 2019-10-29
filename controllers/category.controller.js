const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');
const Position = require('../models/Position');

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById({ _id: req.params.id });
        setTimeout(() => {
            res.status(200).json(category);
        }, 2000);
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.delete = async function (req, res) {
    try {
        await Category.remove({ _id: req.params.id });
        await Position.remove({ category: req.params.id });
        res.status(200).json({ message: 'Removed' });
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.create = async function (req, res) {
    console.log(req.body);
    const category = new Category(
        {
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        });

    try {
        await category.save();
        res.status(200).json({
            message: 'OK'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};
module.exports.update = function (req, res) {

};
