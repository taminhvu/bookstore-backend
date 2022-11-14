const {Author} = require('../models');
const DB_Define = require('../utils/DB_Define');
const author = new Author();

const addAuthor = async function(obj){
    try {
        return author.addData(DB_Define.Author,obj);
    } catch (error) {
        throw error;
    }
}

const getAuthorByID = async function(ID){
    try {
        return author.getOne(DB_Define.Author,"IDTacGia",ID);
    } catch (error) {
        throw error;
    }
}

const updateAuthorByID = async function(ID,obj){
    try {
        const data = await getAuthorByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return author.updateData(DB_Define.Author,"IDTacGia",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteAuthorByID = async function(ID){
    try {
        const data = await getAuthorByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return author.deleteData(DB_Define.Author,"IDTacGia",ID);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addAuthor,
    getAuthorByID,
    updateAuthorByID,
    deleteAuthorByID,
}