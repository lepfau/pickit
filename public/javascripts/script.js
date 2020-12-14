// document.addEventListener('DOMContentLoaded', () => {

//   console.log('IronGenerator JS imported successfully!');

// }, false);

// const service =  axios.create({baseURL:"http://localhost:5000"})
const fullItemList = document.getElementById("item-list-all")

const itemsApi = new APIHandler("http://localhost:5000")

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
  itemsApi.getAllItems()
  .then((respfromAPI) => {
    console.log(respfromAPI.data)
    fullItemList.innerHTML = "";
        respfromAPI.data.forEach((item) => {
      fullItemList.innerHTML += `<div> ${item.name} </div>
      <div> ${item.brand} </div>`
    })})
    .catch((err) => {
                console.log(err);
              });
          });


// window.addEventListener("load", () => {
//   document
//     .getElementById("fetch-all")
//     .addEventListener("click", function (event) {
//       charactersAPI
//         .getFullList()
//         .then((respfromAPI) => {
//           document.querySelector(".characters-container").innerHTML = "";
//           respfromAPI.data.forEach((char) => {
//             document.querySelector(
//               ".characters-container"
//             ).innerHTML += `<div class="character-info">
//         <div class="name">${char.name}</div>
//         <div class="occupation">${char.occupation}</div>
//         <div class="cartoon">${char.cartoon}</div>
//         <div class="weapon">${char.weapon}</div>
//       </div>`;
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });