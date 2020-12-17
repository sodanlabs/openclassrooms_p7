"use strict"

function displayMessage(texte) {
    const elementBody = document.body;
    const messageBox = document.createElement('div');
    messageBox.classList.add("ui", "negative", "message", "messageDisplayed");
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add("header");
    messageHeader.textContent = "Message de service ❗";

    const pContent = document.createElement('p');
    const textContent = document.createTextNode(texte);
    pContent.appendChild(textContent);

    messageBox.appendChild(messageHeader);
    messageBox.appendChild(pContent);
    elementBody.appendChild(messageBox);

    const invisibleContainer = document.getElementById("container");
    invisibleContainer.classList.toggle('invisible');
}

function toggleHeaderButton() {
    const login = document.getElementById("login");
    const signup = document.getElementById("signup");
    const disconnect = document.getElementById("disconnect");

    login.classList.toggle('invisible');
    signup.classList.toggle('invisible');
    disconnect.classList.toggle('invisible');
}