
const itemsApi = new APIHandler("http://localhost:5000")

const fullItemList = document.getElementById("item-list-all")




// async function getAllItems(callback) {
//   try {
//     const res = await service.get("/items");
//     console.log(res.data)
//     callback(res.data)

//   } catch(err) {
//     console.log(err)
//   }
// }

window.addEventListener("load", () => {
  displayItems();
});


function displayItems() {
  itemsApi.getAllItems()
    .then((respfromAPI) => {
      console.log(respfromAPI.data)
      fullItemList.innerHTML = "";
      respfromAPI.data.forEach((item) => {
        fullItemList.innerHTML +=
          `
          <div class="full-item-card">
          <div> Name: ${item.name} </div>
        <div> Brand: ${item.brand} </div>
        <div> Price: ${item.price} € </div>
        <a href="/items/update/${item._id}"><i class="fas fa-edit"></i></a>
        <i class="delete-btn fas fa-trash" item-id="${item._id}" ></i>
        <div> <img src="${item.image}"> </div>
        <a href="/items/detail/${item._id}">See more..</a>
        </div>`
      })
      const deleteButton = document.querySelectorAll(".delete-btn");
      console.log(deleteButton)
      deleteButton.forEach(btn => btn.onclick = (evt) => {
        console.log("hello");
        deleteItem(evt)
      })
    }).catch((err) => {
      console.log(err);
    })
};


async function deleteItem(evt) {
  const id = evt.target.getAttribute("item-id");
  try {
    await itemsApi.deleteOneItem(id);  //delete from database
    await itemsApi.getAllItems(); //"update" database 
    displayItems(); // display again all items on the page
  } catch (err) {
    console.error(err);
  }
}

