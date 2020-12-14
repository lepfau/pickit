class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getAllItems() {
    return axios.get(`${this.BASE_URL}/items/api`)
  }

  getOneItem() {

  }

  createOneItem() {

  }

  updateOneItem() {

  }

  deleteOneItem(itemId) {
    return axios.delete(`${this.BASE_URL}/items/api/delete/` + itemId)
  }
}


  //COPY PASTA FROM LABS SHH
//   async function deleteTodo(evt, callback) {
//     const id = evt.target.getAttribute("data-todo-id");
//     try {
//         await service.delete("/todos/" + id);
//         getTodos(callback);
//       } catch (err) {
//         console.error(err);
//       }
// }

// async deleteOneRegister(charID) {
//   return axios.delete(`${this.BASE_URL}/characters/` + charID);
// }
