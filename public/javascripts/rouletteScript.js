const rouletteAPI = new APIHandler();

const rouletteDiv = document.getElementById("roulette-div");
const rouletteItemUser = document.getElementById("roulettte-item-user-name");
const rouletteItemUserImage = document.getElementById(
  "roulettte-item-user-image"
);

const rouletteBrand = document.getElementById("roulette-brand");
const roulettePrice = document.getElementById("roulette-price");
const rouletteName = document.getElementById("roulette-name");
const rouletteImage = document.getElementById("roulette-image");
const rouletteLink = document.getElementById("roulette-link");

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

window.addEventListener("load", () => {
  renderRoulette();
});

function renderRoulette() {
  rouletteAPI
    .getRouletteItem()
    .then((respfromAPI) => {
      console.log(`printing the respfromAPI data`, respfromAPI.data.message);
      if (respfromAPI.data.message) {
        rouletteDiv.innerHTML = respfromAPI.data.message;
      } else {
        const item = respfromAPI.data.item;
        const user = respfromAPI.data.user;
        rouletteItemUser.innerHTML = `Like it for <strong>${user.firstName}</strong>?`;
        rouletteItemUserImage.src = user.image;
        rouletteBrand.innerHTML = `${item.brand}`;
        roulettePrice.innerHTML = `${item.price} €`;
        rouletteName.innerHTML = `${item.name}`;
        rouletteImage.src = `${item.image}`;
        rouletteLink.href = `${item.link}`;
        likeBtn.setAttribute("item-id", `${item._id}`);
        dislikeBtn.setAttribute("item-id", `${item._id}`);
        likeBtn.href = `/roulette/like/${item._id}`;
        dislikeBtn.href = `/roulette/dislike/${item._id}`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
