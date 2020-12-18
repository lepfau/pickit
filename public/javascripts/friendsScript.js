const usersApi = new APIHandler();

const allFriendsList = document.getElementById("allfriends");
const nonFriendsList = document.getElementById("nonfriends");
const inputSearch = document.querySelector(".input");

window.addEventListener("load", () => {
  displayFriends();
  displayNonFriends();
});

inputSearch.addEventListener("change", async (event) => {
  displayFriends(event.target.value);
  displayNonFriends(event.target.value);
  // usersApi.searchUsers(inputSearch.value)
  //   .then((respfromAPI) => {
  //     console.log(respfromAPI.data)
  //     allFriendsList.innerHTML = "";
  //     nonFriendsList.innerHTML = "";
  //     respfromAPI.data.forEach((user) => {
  //       allFriendsList.innerHTML +=
  //         `<p>${user.firstName}<br> ${user.lastName}</p>`

  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

function displayFriends(value) {
  console.log(value);
  usersApi
    .getFriends(value)
    .then((respfromAPI) => {
      console.log(respfromAPI.data);
      allFriendsList.innerHTML = "";
      respfromAPI.data.forEach((user) => {
        allFriendsList.innerHTML += `
                    <section class="user-card">
                    <div class="user-name">
                        <p>${user.firstName} ${user.lastName}</p>
                        <button style="display:none" class="addFriend" user-id="${user._id}">As as friend</button>
                        <button style="display:block" class="deleteFriend" user-id="${user._id}"> Remove from friends</button>
                    </div>
                    <div class="user-image">
                        <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                    </div>                    
                </section>
                `;
      });
      const allDeleteButtons = document.querySelectorAll(".deleteFriend");
      const allAddButtons = document.querySelectorAll(".addFriend");
      allDeleteButtons.forEach((btn) => {
        btn.onclick = async (evt) => {
          console.log("button works!");
          hideDeleteButton(evt);
          showAddButton(evt);
          await deleteFriendOfUser(evt);
          displayFriends();
          displayNonFriends();
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayNonFriends(value) {
  usersApi
    .getNonFriends(value)
    .then((respfromAPI) => {
      nonFriendsList.innerHTML = "";
      respfromAPI.data.forEach((user) => {
        nonFriendsList.innerHTML += `
                    <section class="user-card">
                    <div class="user-name">
                        <p>${user.firstName} ${user.lastName}</p>
                        <button style="display:block" class="addFriend" user-id="${user._id}"> Add as Friend</button>
                        <button style="display:none" class="deleteFriend" user-id="${user._id}"> Remove from Friends</button>
                    </div>
                    <div class="user-image">
                        <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                    </div>                    
                </section>
                `;
      });

      const allAddButtons = document.querySelectorAll(".addFriend");
      allAddButtons.forEach((btn) => {
        btn.onclick = async (evt) => {
          console.log("button works!");
          hideAddButton(evt);
          showDeleteButton(evt);
          await AddFriendOfUser(evt);
          displayNonFriends();
          displayFriends();
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteFriendOfUser(evt) {
  const id = evt.target.getAttribute("user-id");
  try {
    await usersApi.deleteOneFriend(id);
    await usersApi.getFriends();
  } catch (err) {
    console.error(err);
  }
}

async function AddFriendOfUser(evt) {
  const id = evt.target.getAttribute("user-id");
  try {
    await usersApi.addOneFriend(id);
    await usersApi.getNonFriends();
  } catch (err) {
    console.error(err);
  }
}

function hideDeleteButton(evt) {
  evt.target.style.display = "none";
}

function showAddButton(evt) {
  const allDeleteButtons = document.querySelectorAll(".deleteFriend");
  const id = evt.target.getAttribute("user-id");
  allDeleteButtons.forEach((btn) => {
    if (btn.getAttribute("user-id") === id) {
      btn.style.display = "block";
    }
  });
}

function hideAddButton(evt) {
  evt.target.style.display = "none";
}

function showDeleteButton(evt) {
  const allAddButtons = document.querySelectorAll(".addFriend");
  const id = evt.target.getAttribute("user-id");
  allAddButtons.forEach((btn) => {
    if (btn.getAttribute("user-id") === id) {
      btn.style.display = "block";
    }
  });
}
