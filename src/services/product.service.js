const {Proudct, Product} = require('../models');

const addProduct = async function(obj){
    return Proudct.addProduct(obj);
}

const getProductById = async function(id){
    return Proudct.getProductById(id);
}

const getAllProduct = async function(){
    return Product.getAllProduct();
}

module.exports ={
    addProduct,
    getAllProduct,
    getProductById,
}