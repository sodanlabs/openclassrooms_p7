"use strict"

// Hide the main container and display a message
function displayMessage(texte) {
    const elementBody = document.body;
    const messageBox = document.createElement('div');
    messageBox.classList.add("ui", "negative", "message", "messageDisplayed");
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add("header");
    messageHeader.textContent = "❗ Message de service ❗";

    const pContent = document.createElement('p');
    const textContent = document.createTextNode(texte);
    pContent.appendChild(textContent);

    messageBox.appendChild(messageHeader);
    messageBox.appendChild(pContent);
    elementBody.appendChild(messageBox);

    const invisibleContainer = document.getElementById("container");
    invisibleContainer.classList.toggle('invisible');
}

// Show or hide the menu bar
function toggleHeaderButton() {
    const buttonIsNotLogged = document.getElementById("header_button_not_logged");
    buttonIsNotLogged.classList.toggle('invisible');

    const buttonIsLoggedIn = document.getElementById("header_button_isLoggedIn");
    buttonIsLoggedIn.classList.toggle('invisible');

    const authentification = JSON.parse(localStorage.getItem("Auth"));
    const username = document.getElementById("header_button_isLoggedIn_username");
    username.textContent = authentification.username;
    
}

// Show or hide user card
function toggleAccountPage() {
    const isNotLoggedIn = document.getElementById("isNotLoggedIn");
    const isLoggedIn = document.getElementById("isLoggedIn");

    isNotLoggedIn.classList.toggle('invisible');
    isLoggedIn.classList.toggle('invisible');
}

// JQuery pour l'affichage du dropdown du header
$('.ui.dropdown')
.dropdown({
    clearable: true
});