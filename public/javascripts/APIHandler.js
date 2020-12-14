class APIHandler {
    constructor (baseUrl) {
      this.BASE_URL = baseUrl;
    }
  
    getAllItems () {
      return axios.get(`${this.BASE_URL}/items/api`)
    }
  
    getOneItem () {

    }
  
    createOneItem () {
  
    }
  
    updateOneItem () {
  
    }
  
    deleteOneItem () {
  
    }
  }
  