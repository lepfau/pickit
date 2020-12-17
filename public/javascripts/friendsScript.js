const usersApi = new APIHandler();

const allFriendsList = document.getElementById("allfriends");
const nonFriendsList = document.getElementById("nonfriends");

window.addEventListener("load", () => {
  displayFriends();
  displayNonFriends();
  searchUser();
});

function displayFriends() {
  usersApi
    .getFriends()
    .then((respfromAPI) => {
      console.log(respfromAPI.data);
      allFriendsList.innerHTML = "";
      respfromAPI.data.forEach((user) => {
        allFriendsList.innerHTML += `
                    <section class="user-card">
                    <div class="user-name">
                        <p>${user.firstName}<br> ${user.lastName}</p>
                    </div>
                    <div class="user-image">
                        <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                    </div>
                    
                        <button style="visibility:hidden" class="addFriend" user-id="${user._id}"> Add</button>

                        <button style="visibility:visible" class="deleteFriend" user-id="${user._id}"> Delete</button>
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




function displayNonFriends() {
  usersApi
    .getNonFriends()
    .then((respfromAPI) => {
      nonFriendsList.innerHTML = "";
      respfromAPI.data.forEach((user) => {
        nonFriendsList.innerHTML += `
                    <section class="user-card">
                    <div class="user-name">
                        <p>${user.firstName}<br> ${user.lastName}</p>
                    </div>
                    <div class="user-image">
                        <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                    </div>
                    
                        <button style="visibility:visible" class="addFriend" user-id="${user._id}"> Add</button>

                        <button style="visibility:hidden" class="deleteFriend" user-id="${user._id}"> Delete</button>
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

function searchUser() {
  usersApi.searchUsers();
  displayFriends();
  displayNonFriends()
}

function hideDeleteButton(evt) {
  evt.target.style.visibility = "hidden";
}

function showAddButton(evt) {
  const allDeleteButtons = document.querySelectorAll(".deleteFriend");
  const id = evt.target.getAttribute("user-id");
  allDeleteButtons.forEach((btn) => {
    if (btn.getAttribute("user-id") === id) {
      btn.style.visibility = "visible";
    }
  });
}

function hideAddButton(evt) {
  evt.target.style.visibility = "hidden";
}

function showDeleteButton(evt) {
  const allAddButtons = document.querySelectorAll(".addFriend");
  const id = evt.target.getAttribute("user-id");
  allAddButtons.forEach((btn) => {
    if (btn.getAttribute("user-id") === id) {
      btn.style.visibility = "visible";
    }
  });
}
