"use strict";

class Messages {
    constructor(id, userId, title, description, attachment) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.attachment = attachment;
    }

    createCardMessage() {
        const card = document.createElement("a");
        card.id = this.id;
        card.classList.add("card");
        card.setAttribute('href', "pages/message.html?id=" + this.id);

        const messageTitle = document.createElement("p");
        messageTitle.textContent = this.title;
        messageTitle.classList.add("messageTitle");

        const messageAuthor = document.createElement("p");
        messageAuthor.textContent = "Écrit avec ❤ par " + this.userId;
        messageAuthor.classList.add("messageAuthor");

        const messageDescription = document.createElement("p");
        messageDescription.textContent = this.description;
        messageDescription.classList.add("messageDescription");

        let attachmentMessage = document.createElement("img");   
        if (this.attachment != null) {
            attachmentMessage.setAttribute("src", this.attachment);
            attachmentMessage.setAttribute("alt", "Image par " + this.userId);
            attachmentMessage.classList.add("ui", "small", "image");
            attachmentMessage.classList.add("attachmentMessage");
        }

        const messageCard = document.createElement("div");
        messageCard.classList.add("messageCard");
        messageCard.appendChild(messageTitle);
        messageCard.appendChild(messageDescription);
        if (this.attachment != null) {
            messageCard.appendChild(attachmentMessage);
        }
        messageCard.appendChild(messageAuthor);

        card.appendChild(messageCard);

        return card;
    }

    appendCardMessageToContainer() {
        const cardMessage = this.createCardMessage();
        document.getElementById("container").appendChild(cardMessage);
    }

    // Add Append Comment HERE
}
