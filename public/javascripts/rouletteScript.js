const rouletteAPI = new APIHandler("http://localhost:5000");

const rouletteBrand = document.getElementById("roulette-brand");
const roulettePrice = document.getElementById("roulette-price");
const rouletteName = document.getElementById("roulette-name");
const rouletteImage = document.getElementById("roulette-image");
const rouletteLink = document.getElementById("roulette-link");

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

window.addEventListener("load", () => {
  renderRoulette();
  likeBtn.onclick = () => {
    likeBtnEventListener();
  };
  dislikeBtn.onclick = () => {
    dislikeBtnEventListener();
  };
});

function renderRoulette() {
  rouletteAPI
    .getRouletteItem()
    .then((respfromAPI) => {
      console.log(respfromAPI.data);
      const item = respfromAPI.data;
      rouletteBrand.innerHTML = `${item.brand}`;
      roulettePrice.innerHTML = `${item.price}`;
      rouletteName.innerHTML = `${item.name}`;
      rouletteImage.src = `${item.image}`;
      rouletteLink.href = `${item.link}`;
      likeBtn.setAttribute("item-id", item._id);
      dislikeBtn.setAttribute("item-id", item._id);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function likeBtnEventListener() {
  //   const id = evt.target.getAttribute("item-id");
  //   const itemToModify = await ItemModel.findById(id);
  try {
    renderRoulette();
    // itemToModify.update(); // add reaction
    // TBD: SAVE USERID + "LIKE" TO ITEM DATABASE
  } catch (err) {
    console.error(err);
  }
}

async function dislikeBtnEventListener() {
  //   const id = evt.target.getAttribute("item-id");
  try {
    renderRoulette();
    // TBD: SAVE USERID + "DISLIKE" TO ITEM DATABASE
  } catch (err) {
    console.error(err);
  }
}
