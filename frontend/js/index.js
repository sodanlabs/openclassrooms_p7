"use strict"

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
            // const messagesList = await response.json();
            // localStorage.setItem('messagesList', JSON.stringify(messagesList));
            // console.log("messagesList :", messagesList);

            const messagesList = await response.json();

            localStorage.setItem('messagesList', JSON.stringify(messagesList));
            console.log("messagesList :", messagesList);

            messagesList.forEach(message => {
                const newCard = new Messages(message.id, message.userId, message.title, message.description, message.attachment);
                newCard.appendCardMessageToContainer();
            });
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
        // displayMessage("Une erreur sur le serveur est survenue, veuillez réessayer plus tard");
    }
}

/*****************************************************************************/

if (isLogged()) {
    getAllMessages();
} else {
    displayMessage("Vous n'êtes pas autorisé à aller plus loin, veuillez vous authetifier. Merci");
}


