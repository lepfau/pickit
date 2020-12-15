const itemsApi = new APIHandler("http://localhost:5000");
const rouletteDiv = document.getElementById("roulette-div");
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

window.addEventListener("load", () => {
  getItemsForRoulette();
});

async function getItemsForRoulette() {
  try {
    const dbres = await itemsApi.getAllItems();
    console.log(dbres.data);
    const itemsForRoulette = dbres.data; //!!!!! MAJOR ISSUES
    itemsForRoulette.forEach((item) => {
      // PROB NOT FUNCTIONING CORRECTLY
      renderRouletteDiv(item);
      likeBtn.onclick = (evt) => {
        addLikeToItemDatabase(evt);
      };
      //   dislikeBtn.onclick = (evt) => {
      //     addDislikeToItemDatabase(evt);
      //   };
    });
  } catch (err) {
    console.log(err);
  }
}

function renderRouletteDiv(item) {
  rouletteDiv.innerHTML = "";
  rouletteDiv.innerHTML += `<div>
        <p>Like it for USERNAME PLACEHOLDER? </p>
        <img src="" alt=""> IMG PLACEHOLDER
    </div>
    <hr>
    <div>
        <div>
            <p>${item.brand}</p>
            <p>${item.price}</p>
        </div>
        <p>${item.name}</p>
        <div>
            <p><i id="dislike-btn" class="fas fa-thumbs-down" item-id="${item._id}"></i></p>
            <img src="${item.image}" alt="">
            <p><i id="like-btn" class="fas fa-heart" item-id="${item._id}"></i></p>
        </div>
        <a href="${item.link}">See more details</a>
    </div>`;
}

async function addLikeToItemDatabase(evt) {
  const id = evt.target.getAttribute("item-id");
  try {
    // TBD: SAVE USERID + "LIKE" TO ITEM DATABASE
    getItemsForRoulette();
  } catch (err) {
    console.error(err);
  }
}

async function addDislikeToItemDatabase(evt) {
  const id = evt.target.getAttribute("item-id");
  try {
    // TBD: SAVE USERID + "DISLIKE" TO ITEM DATABASE
    getItemsForRoulette();
  } catch (err) {
    console.error(err);
  }
}
