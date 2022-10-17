const { verify } = require('crypto');
const Joi = require('joi');
const { join } = require('path');
const { MatKhau } = require('./custom.validation');
const register = {
    body: Joi.object().keys({
        HoTen: Joi.string().required(),
        Email: Joi.string().required().email(),
        MatKhau: Joi.string().required().custom(MatKhau),
        GioiTinh: Joi.number().required(),
        NgaySinh: Joi.string().required().isoDate(),
    }),
};
const login = {
    body: Joi.object().keys({
        Email: Joi.string().required().email(),
        MatKhau: Joi.string().required().custom(MatKhau),
    }),
};

const sendVerificationEmail = {
    body: Joi.object().keys({
        Email: Joi.string().required().email(),
    })
}

const verifyEmailToken = {
    body: Joi.object().keys({
        token: Joi.string().required(),
    })
}
module.exports = {
    register,
    login,
    sendVerificationEmail,
    verifyEmailToken,
}