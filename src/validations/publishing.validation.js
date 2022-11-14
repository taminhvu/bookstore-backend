const { string } = require('joi');
const Joi = require('joi');
const addPublisher = {
    body: Joi.object().keys({
        TenNhaXuatBan: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const updatePulisher = {
    body: Joi.object().keys({
        TenNhaXuatBan: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const deletePublisher = {
    body: Joi.object().keys({
    }),
};

const getPublisher = {
    body: Joi.object().keys({
    }),
};
module.exports ={
    addPublisher,
    updatePulisher,
    deletePublisher,
    getPublisher,
}