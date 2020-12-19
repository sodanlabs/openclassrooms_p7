"use strict"

async function deleteMessagFromDb() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        const response = await fetch("http://localhost:3000/api/message/" + getMessageId(), {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.status == 201) {
            alert("Le message a bien été supprimé");
            window.location.href = "../index.html";
        } else {
            alert("Rien ne s'est passé comme prévu");
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

async function updateMessage(messageToSend) {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        const response = await fetch("http://localhost:3000/api/message/" + getMessageId(), {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            },
            body: messageToSend
        });
        if (response.status == 201) {
            alert("Le message a bien été modifié");
            // Recharge la page actuelle pour faire apparaitre le message
            document.location.reload();
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

function checkDataMessageToSubmitBeforeUpdate() {
    const messageToSend = new FormData();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const attachment = document.getElementById('attachment').files[0];

    if (title) {
        messageToSend.append("title", title);
    }

    if (description) {
        messageToSend.append("description", description);
    }

    if (!(typeof attachment === 'undefined')) {
        messageToSend.append("image", attachment);
    }  

    if (title || description || !(typeof attachment === 'undefined')) {
        updateMessage(messageToSend);
    } else {
        alert("Veuillez inscrire une valeur dans les champs vides ou en rouge pour valider le formulaire.");
    }
}

// Vérifie si l'utilisateur a le droit de modifier le message
function getIfUserCanModifyMessage(authorMessage, userId, userPermission) {
    if (authorMessage == userId || userPermission == true) {
        return true;
    } else {
        return false;
    }
}

// Affiche le formulaire pour modifier le message
function toggleModalForm() {
    const modale = document.getElementById("modale");
    modale.classList.toggle('invisible');
}

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
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.ok) {
            const messageData = await response.json();
            const createCard = new Messages(messageData.id, messageData.userId, messageData.title, messageData.description, messageData.attachment);
            createCard.appendCardMessageToContainer();
            // createCard.appendItemMessageToContainer();

            document.getElementById(createCard.id).removeAttribute("href");

            // Test si les droits utilisateur et affiche le formulaire
            const userRights = getIfUserCanModifyMessage(messageData.userId, authentification.userId, authentification.isAdmin);

            if (userRights == true) {
                toggleModalForm();
                const modifyMessage = document.getElementById('modifyMessage');
                modifyMessage.addEventListener("click", (event) => {
                    event.preventDefault();
                    checkDataMessageToSubmitBeforeUpdate();
                });

                const deleteMessage = document.getElementById('deleteMessage');
                deleteMessage.addEventListener("click", (event) => {
                    event.preventDefault();
                    deleteMessagFromDb();
                });
            }

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