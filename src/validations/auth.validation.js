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

module.exports = {
    register,
    login,
}