const { string } = require('joi');
const Joi = require('joi');
const changeInfo = {
    body: Joi.object().keys({
        HoTen: Joi.string().required(),
        GioiTinh: Joi.number().required(),
        NgaySinh: Joi.string().required().isoDate(),
    }),
};
const getInfor = {
    body: Joi.object().keys({
    }),
};

module.exports ={
    changeInfo,
    getInfor,
}