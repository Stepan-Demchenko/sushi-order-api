const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const errorHandler = require('../../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, 'dev-jwt', {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Invalid password or email'
            })
        }
    } else {
        res.status(404).json({
            message: 'Can`t find user'
        })
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(409).json({
            message: 'User already exist'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            const newCandidtae = await User.findOne({email: req.body.email});
            const token = jwt.sign({
                email: newCandidtae.email,
                userId: newCandidtae._id
            }, 'dev-jwt', {expiresIn: 60 * 60});

            res.status(201).json({
                token: `Bearer ${token}`
            });
        } catch (e) {
            errorHandler(res,e);
        }
    }
};
