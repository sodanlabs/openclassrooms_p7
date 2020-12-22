"use strict"

// Check if the user token exist and hides the header accordingly
function isLogged() {
    const auth = JSON.parse(localStorage.getItem('Auth'));
    if (!auth) {
        return false;
    } else {
        toggleHeaderButton();
        return true;
    }
}

// Delete the user token and return to the login page
function disconnectUser() {
    alert("Vous venez de vous déconnecter, au revoir");
    localStorage.removeItem("Auth");
    window.location.href = "../../pages/account.html";
}

/*****************************************************************************/

// Add the Event Listener on the logout button
const disconnectButton = document.getElementById('disconnect_button');
disconnectButton.addEventListener("click", (event) => {
    event.preventDefault();
    disconnectUser();
});