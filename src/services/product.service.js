const {Product} = require('../models');
const DB_Define = require('../utils/DB_Define');
const product = new Product()

const addProduct = async function(obj){
    return product.addProduct(obj);
}

const getProductByID = async function(id){
    return product.getProductByID(id);
}
const getProductByIDDanhMuc = async function(id){
    return product.getProductByIDDanhMuc(id);
}
const getProductByIDTheLoai = async function(id){
    return product.getProductByIDTheloai(id);
}
const getProductByIDNhaXuatBan = async function(id){
    return product.getProductByIDNhaXuatBan(id);
}
const getAllProduct = async function(){
    return product.getAllProduct();
}
const deleteProductByID = async function(ID){
    try {
        const data = await getProductByID(ID);
        if(data.length==0) throw new Error("ID not Found");
        return product.deleteData(DB_Define.Product,"IDSanPham",ID);
    } catch (error) {
        throw error;
    }

}
const updateProductByID = async function(ID,obj){
    try {
        const data = await getProductByID(ID);
        if(data.length==0) throw new Error("ID not Found");
        return product.updateData(DB_Define.Product,"IDSanPham",obj,ID);
    } catch (error) {
        throw error;
    }

}
const getNewProduct = async function(){
    return product.getNewProduct();
}
const getBestSeller = async function(){
    return product.getBestseller();
}
module.exports ={
    getNewProduct,
    addProduct,
    getAllProduct,
    getProductByID,
    deleteProductByID,
    updateProductByID,
    getProductByIDDanhMuc,
    getProductByIDTheLoai,
    getProductByIDNhaXuatBan,
    getBestSeller,
}