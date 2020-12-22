"use strict"

// Delete the message stored in the server
async function deleteMessageFromDb() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        const response = await fetch("http://localhost:3000/api/message/" + getMessageId(), {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.status == 201) {
            closeModal(stateModalEvent);
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

// Send the modified message to the server
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
            closeModal(stateModalEvent);
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

// Check the validity of the information entered in the form
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

// Check if user rights to modify message
function getIfUserCanModifyMessage(authorMessage, userId, userPermission) {
    if (authorMessage == userId || userPermission == true) {
        return true;
    } else {
        return false;
    }
}

// Show the Form in a modal window
function toggleModalForm() {
    const modal = document.getElementById("modal");
    modal.classList.toggle('invisible');
}

// Get the message Id from url
function getMessageId() {
    const dataQuery = window.location.search;
    const messageId = dataQuery.replace("?id=", "");
    return messageId;
}

// Remove decoration for message page
function removeDecoration(messageId) {
    const bodyMessageDecoration = document.getElementsByClassName('message_body_content_description')[0];
    bodyMessageDecoration.classList.remove("blur", "line_clamp");
    document.getElementById(`message_${messageId}`).removeAttribute("href");
}


// Get the message informations from it's Id and load it into the page
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

            createCard.initMessage();
            removeDecoration(createCard.id);

            // Test if user rights and display the form
            const userRights = getIfUserCanModifyMessage(messageData.userId, authentification.userId, authentification.isAdmin);

            if (userRights == true) {

                const message_body_modify = document.getElementsByClassName('message_body_modify')[0];
                message_body_modify.classList.toggle('invisible');
                const modifyButton = document.getElementById('modify_button');
                modifyButton.addEventListener('click', (event) => {
                openModal(event);
                });

                const modifyMessage = document.getElementById('modifyMessage');
                modifyMessage.addEventListener("click", (event) => {
                    event.preventDefault();
                    stateModalEvent = event;
                    checkDataMessageToSubmitBeforeUpdate();
                });

                const deleteMessage = document.getElementById('deleteMessage');
                deleteMessage.addEventListener("click", (event) => {
                    event.preventDefault();
                    stateModalEvent = event;
                    deleteMessageFromDb();
                });
            }

        } else {
            displayMessage("On ne connait pas ce message, attendez encore un peu, il arriva peut-être... 😁");
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

/*******************************************************************************/

let stateModalEvent = null;

// Display page content if valid auth
if (isLogged()) {
    if (!getMessageId()) {
        displayMessage("Oops, pas de bras, pas de chocolat 🍫 \n ce message n'existe pas mais on croit en vous !");
    } else {
        getMessage();
    }
} else {
    window.location.href = "account.html";
}