const {Publishing} = require('../models');
const publisher = new Publishing();
const DB_Define = require('../utils/DB_Define');

const addPublisher = async function(obj){
    try {
        return publisher.addData(DB_Define.PublishingCompany,obj);
    } catch (error) {
        throw error;
    }
}

const getPublisherByID = async function(ID){
    try {
        const data = await publisher.getOne(DB_Define.PublishingCompany,"IDNhaXuatBan",ID);
        if(data.length === 0) throw new Error("Publisher not found");
        return data;
    } catch (error) {
        throw error;
    }
}

const updatePublisher = async function(obj,ID){
    try {
        await getPublisherByID(ID);
        return publisher.updateData(DB_Define.PublishingCompany,"IDNhaXuatBan",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deletePublisher = async function(ID){
    try {
        await getPublisherByID(ID);
        return publisher.deleteData(DB_Define.PublishingCompany,"IDNhaXuatBan",ID);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addPublisher,
    updatePublisher,
    getPublisherByID,
    deletePublisher,
}