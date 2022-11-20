const { string } = require('joi');
const Joi = require('joi');
const addOrder = {
    body: Joi.object().keys({
        DiaChi:Joi.string().required(),
        ChiTietDonHang:Joi.array().required(),
    }),
};
module.exports ={
    addOrder,
}