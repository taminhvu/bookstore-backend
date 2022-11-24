const { string } = require('joi');
const Joi = require('joi');
const addOrder = {
    body: Joi.object().keys({
        DiaChi:Joi.string().required(),
        PhiShip:Joi.number().required(),
        ChiTietDonHang:Joi.array().required(),
        
    }),
};
const getOrder = {
    body: Joi.object().keys({
    }),
};
module.exports ={
    addOrder,
    getOrder,
}