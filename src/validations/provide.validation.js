const { string } = require('joi');
const Joi = require('joi');
const addProvider = {
    body: Joi.object().keys({
        TenNhaCungCap: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const updateProvider = {
    body: Joi.object().keys({
        TenNhaCungCap: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const deleteProvider = {
    body: Joi.object().keys({
    }),
};
const getProvider = {
    body: Joi.object().keys({
    }),
};
module.exports ={
    addProvider,
    updateProvider,
    deleteProvider,
    getProvider,
}