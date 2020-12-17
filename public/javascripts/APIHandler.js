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

  saveRouletteDislike(itemId) {
    return this.service.get("/roulette/dislike/" + itemId);
  }

  //FRIEND PART
  getFriends(searchValue) {
    return this.service.get("/friends/friends/api", {
      params: {
        search: searchValue
      }
    });
  }

  getNonFriends(searchValue) {
    return this.service.get("/friends/nonfriends/api", {
      params: {
        search: searchValue
      }
    });
  }

  addOneFriend(friendId) {
    return this.service.post("/friends/api/add/", { id: friendId });
  }

  deleteOneFriend(friendId) {
    return this.service.post("/friends/api/delete", { id: friendId }, {});
  }

  searchUsers(str) {
    return this.service.get("/friends/search/api", {
      params: {
        search: str
      }
    })
  }
}
