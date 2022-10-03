class Response{
    constructor(error, message, data){
        this.error = error;
        this.message = message;
        this.response = data;
    }
}
module.exports = Response;