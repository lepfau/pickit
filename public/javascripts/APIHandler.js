class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.service = axios.create({
      baseURL: baseUrl,
    });
  }

  getAllItems() {
    return this.service.get(`/items/api`);
  }

  getRouletteItem() {
    return this.service.get(`/roulette/api`);
  }

  saveRouletteLike(itemId) {
    return this.service.get("/roulette/like/" + itemId);
  }

  deleteOneItem(itemId) {
    return this.service.delete(`/items/api/delete/` + itemId);
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
