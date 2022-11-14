const { string } = require('joi');
const Joi = require('joi');
const addOrder = {
    body: Joi.object().keys({
        SoLuong:Joi.number().required(),
        TongTien:Joi.number().required(),
        DiaChi:Joi.string().required(),
        ChiTietDonHang:Joi.array().required(),
    }),
};
module.exports ={
    addOrder,
}