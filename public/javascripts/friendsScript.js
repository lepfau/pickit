const usersApi = new APIHandler();

const allFriendsList = document.getElementById("allfriends");



window.addEventListener("load", () => {
    displayUsers();
});


function displayUsers() {

    usersApi
        .getFriends()
        .then((respfromAPI) => {
            console.log(respfromAPI.data);
            allFriendsList.innerHTML = "";
            respfromAPI.data.forEach((user) => {
                allFriendsList.innerHTML +=
                    `
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
                `
            });
            const allDeleteButtons = document.querySelectorAll(".deleteFriend");
            const allAddButtons = document.querySelectorAll(".addFriend")
            console.log(allDeleteButtons);
            allDeleteButtons.forEach((btn) => {
                (btn.onclick = (evt) => {

                    console.log("button works!")
                    hideDeleteButton(evt);
                    showAddButton(evt);
                    deleteFriendOfUser(evt);
                    // usersApi.getFriends()

                    // displayUsers();
                })
            })

        })
        .catch((err) => {
            console.log(err)
        })
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



function hideDeleteButton(evt) {
    evt.target.style.visibility = "hidden"
};

function showAddButton(evt) {
    const allAddButtons = document.querySelectorAll(".addFriend")
    const id = evt.target.getAttribute("user-id");
    allAddButtons.forEach(btn => {
        if (btn.getAttribute("user-id") === id) {
            btn.style.visibility = "visible"
        }
    });
}


// async function addFriendchangeBtn(evt) {
//     const friendId = evt.target.getAttribute("user-id");
//     try {
//         await usersApi.addOneFriend(friendId);
//         await usersApi.getAllFriends();
//         displayUsers();
//     } catch (err) {
//         console.error(err);
//     }
// }


// function hideButton(evt) {
//     const id = evt.target.getAttribute("user-id");
//     try {

//     }
// }


