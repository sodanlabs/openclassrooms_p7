"use strict"

// Cacher le container principal et afficher un message
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

// Afficher ou cacher la barre de menu
function toggleHeaderButton() {
    const disconnect = document.getElementById("disconnect");

    disconnect.classList.toggle('invisible');
}

// Afficher ou cacher la carte utilisateur
function toggleAccountPage() {
    const isNotLoggedIn = document.getElementById("isNotLoggedIn");
    const isLoggedIn = document.getElementById("isLoggedIn");

    isNotLoggedIn.classList.toggle('invisible');
    isLoggedIn.classList.toggle('invisible');
}

// Afficher ou cacher la page Signup
function toggleSignupPage() {
    const isLoggedIn = document.getElementById("isLoggedIn");

    isLoggedIn.classList.toggle('invisible');
}