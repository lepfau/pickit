const itemsApi = new APIHandler();

const fullItemList = document.getElementById("item-list-all");

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
  itemsApi
    .getAllItems()
    .then((respfromAPI) => {
      console.log(respfromAPI.data);
      fullItemList.innerHTML = "";
      respfromAPI.data.forEach((item) => {
        fullItemList.innerHTML += `
        <div class="full-item-card">
          <div class="item-image"> 
            <img src="${item.image}"> 
          </div>
          <div class="all-item-info">
            <div class="item brand-price">
                  <div class="item-brand">${item.brand} </div>
                  <div class="item-price"> €${item.price}</div>
            </div>          
            <p class="item-name">${item.name} </p>
            <p class ="see-more-link"> <a href="/items/${item._id}">Click for item details</a> </p>
              
            <div class="bottom-icons">
              <div class="likes-dislike"> 
                <i class="fas fa-heart"><br><span>${item.likes.length}</span></i>
                <i class="fas fa-thumbs-down"><br><span>${item.dislikes.length}</span></i>
              </div>  
              <div class="update-trash"> 
                <a href="/items/update/${item._id}"><i class="fas fa-edit"></i></a>
                <i class="delete-btn fas fa-trash" item-id="${item._id}" ></i>
              </div>
            </div>
          </div>  
        </div>
        <hr>
        `;
      });
      const deleteButton = document.querySelectorAll(".delete-btn");
      console.log(deleteButton);
      deleteButton.forEach(
        (btn) =>
          (btn.onclick = (evt) => {
            console.log("hello");
            deleteItem(evt);
          })
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteItem(evt) {
  const id = evt.target.getAttribute("item-id");
  try {
    await itemsApi.deleteOneItem(id); //delete from database
    await itemsApi.getAllItems(); //"update" database
    displayItems(); // display again all items on the page
  } catch (err) {
    console.error(err);
  }
}
