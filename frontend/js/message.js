"use strict"

// Récupérer l'Id depuis l'url
function getMessageId() {
    const dataQuery = window.location.search;
    const messageId = dataQuery.replace("?id=", "");
    return messageId;
}

// Récupérer les informations du produit à partir de son Id et le charge dans la page
async function getMessage() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        const response = await fetch("http://localhost:3000/api/message/" + getMessageId(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.ok) {
            const messageData = await response.json();
            const createCard = new Messages(messageData.id, messageData.userId, messageData.title, messageData.description, messageData.attachment);
            createCard.appendCardMessageToContainer();

            document.getElementById(createCard.id).removeAttribute("href");
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

/*******************************************************************************/

if (isLogged()) {
    if (!getMessageId()) {
        displayMessage("On ne connait pas ce message, attendez encore un peu, il arriva peut-être... 😁");
    } else {
        getMessage();
    }   
} else {
    displayMessage("Vous n'êtes pas autorisé à aller plus loin, veuillez vous authetifier. Merci");
}