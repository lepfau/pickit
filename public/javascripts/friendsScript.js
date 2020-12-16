const addButton = document.querySelector(".addBtn");

function hideButton() {
    addButton.style.visibility = "hidden"
}

addButton.addEventListener('click', () => {
    hideButton()
})
