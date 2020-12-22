"use strict"

// Send the created message to the server
async function submitMessage(messageToSend) {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        let response = await fetch("http://localhost:3000/api/message", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            },
            body: messageToSend
        });
        if (response.ok) {
            closeModal(stateModalEvent);
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
function checkDataMessageToSubmit() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    let attachment = null;

    if (document.getElementById('attachment')) {
        attachment = document.getElementById('attachment').files[0];
    }

    if (title.length > 3 && description.length > 3) {
        const messageToSend = new FormData();
        messageToSend.append("title", title);
        messageToSend.append("description", description);
        messageToSend.append("image", attachment);

        submitMessage(messageToSend);
    } else {
        alert("Veuillez inscrire une valeur dans les champs vides ou en rouge pour valider le formulaire.");
    }
}

// Get all messages existing on the server
async function getAllMessages() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        let response = await fetch("http://localhost:3000/api/message", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.ok) {
            const messagesList = await response.json();

            messagesList.forEach(message => {
                const newCard = new Messages(message.id, message.userId, message.title, message.description, message.attachment);
                newCard.initMessage();
                // newCard.appendCardMessageToContainer();
            });
        } else {
            console.error('Response Erreur : ', response.status);
            displayMessage("Mais il y a encore aucun message sur le site, faîtes marcher votre imagination !")
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

/*****************************************************************************/

let stateModalEvent = null;

// If auth then loads the messages and add events listener on the buttons
if (isLogged()) {
    getAllMessages();

    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        stateModalEvent = event;
        checkDataMessageToSubmit();
    });

    const writeMessageButton = document.getElementById('writeMessageButton');
    writeMessageButton.classList.toggle('invisible');
    writeMessageButton.addEventListener('click', (event) => {
    openModal(event);
    });
    
} else {
    alert("Vous n'êtes pas autorisé à aller plus loin, veuillez vous authentifier. Merci");
    window.location.href = "./pages/account.html";
}