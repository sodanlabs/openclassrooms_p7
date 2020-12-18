"use strict"

// Vérifie le token utilisateur est présent et cache le header en conséquence
function isLogged() {
    const auth = JSON.parse(localStorage.getItem('Auth'));
    if (!auth) {
        return false;
    } else {
        toggleHeaderButton();
        return true;
    }
}

// Supprimer le token utilisateur et renvoi sur la page de connexion
function disconnectUser() {
    alert("Vous venez de vous déconnecter, au revoir");
    localStorage.removeItem("Auth");
    window.location.href = "../../pages/account.html";
}

/*****************************************************************************/

const disconnectButton = document.getElementById('disconnect');
disconnectButton.addEventListener("click", (event) => {
    event.preventDefault();
    disconnectUser();
});