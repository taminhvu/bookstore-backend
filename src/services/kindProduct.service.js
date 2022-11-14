const {KindProduct} = require('../models');
const DB_Define = require('../utils/DB_Define');
const kindProduct = new KindProduct();

const addKindProduct = async function(obj){
    try {
        return kindProduct.addData(DB_Define.KindOfProduct,obj);
    } catch (error) {
        throw error;
    }
}

const getKindProductByID = async function(ID){
    try {
        return kindProduct.getOne(DB_Define.KindOfProduct,"IDTheLoai",ID);
    } catch (error) {
        throw error;
    }
}

const updateKindProductByID = async function(ID,obj){
    try {
        const data = await getKindProductByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return kindProduct.updateData(DB_Define.KindOfProduct,"IDTheLoai",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteKindProductByID = async function(ID){
    try {
        const data = await getKindProductByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return kindProduct.deleteData(DB_Define.KindOfProduct,"IDTheLoai",ID);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addKindProduct,
    getKindProductByID,
    updateKindProductByID,
    deleteKindProductByID,
}