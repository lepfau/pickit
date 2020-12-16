class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.service = axios.create({
      baseURL: baseUrl,
    });
  }

  //ITEMS PART
  getAllItems() {
    return this.service.get(`/items/api`);
  }

  deleteOneItem(itemId) {
    return this.service.delete(`/items/api/delete/` + itemId);
  }

  //ROULETTE PART
  getRouletteItem() {
    return this.service.get(`/roulette/api`);
  }

  saveRouletteLike(itemId) {
    return this.service.get("/roulette/like/" + itemId);
  }

  //FRIEND PART
  getFriends() {
    return this.service.get("/friends/friends/api");
  }

  getNonFriends() {
    return this.service.get("/friends/nonfriends/api");
  }

  addOneFriend(friendId) {
    return this.service.post("/friends/api/add/", { id: friendId });
  }

  deleteOneFriend(friendId) {
    return this.service.post("/friends/api/delete", { id: friendId });
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
