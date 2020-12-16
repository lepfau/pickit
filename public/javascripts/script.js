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
        <div class="left-part">
               <div class="item-image"> 
               <img src="${item.image}"> 
               </div>
                <div class="item-description">
                <div class="item-brand">${item.brand} </div>
                <div class="item-name">${item.name} </div>
                <div class="item-price"> ${item.price} € </div>
                <div> <a href="/items/${item.name}">See more..</a> </div>
                </div>
             </div>
             
             <div class="right-part">
               <a href="/items/update/${item._id}"><i class="fas fa-edit"></i></a>
               <i class="delete-btn fas fa-trash" item-id="${item._id}" ></i>
            </div>   
        </div>
        <div class="bottom-part"> 
        <i class="fas fa-heart"><br><span>12</span></i>
        <i class="fas fa-thumbs-down"><br><span>5</span></i>
        </div>
        <br> <hr>
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


