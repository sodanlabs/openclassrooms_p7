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
            attachmentMessage.setAttribute("alt", "Image par offerte" + this.userId);
        } else {
            attachmentMessage.setAttribute("src", "https://picsum.photos/100/50");
            attachmentMessage.setAttribute("alt", "Image aléatoire servie par picsum.photos");
        }
        attachmentMessage.classList.add("ui", "small", "image");
        attachmentMessage.classList.add("attachmentMessage");

        const messageCard = document.createElement("div");
        messageCard.classList.add("messageCard");
        messageCard.appendChild(messageTitle);
        messageCard.appendChild(messageDescription);
        messageCard.appendChild(attachmentMessage);
        messageCard.appendChild(messageAuthor);

        card.appendChild(messageCard);

        return card;
    }

    appendCardMessageToContainer() {
        const cardMessage = this.createCardMessage();
        document.getElementById("container").appendChild(cardMessage);
    }

    appendItemMessageToContainer() {
        const itemMessage = this.createMessageItem();
        document.getElementById("containerItem").appendChild(itemMessage);
    }

    createMessageItem() {
        // const containerItem = document.createElement("div");
        // containerItem.classList.add("ui", "items");
        // containerItem.id = this.id;

        const item = document.createElement("a");
        item.classList.add("item");
        item.setAttribute('href', "pages/message.html?id=" + this.id);

        const containerAttachmentMessage = document.createElement("div");
        containerAttachmentMessage.classList.add("image");

        let attachmentMessage = document.createElement("img");
        if (this.attachment != null) {
            attachmentMessage.setAttribute("src", this.attachment);
            attachmentMessage.setAttribute("alt", "Image par offerte" + this.userId);
        } else {
            attachmentMessage.setAttribute("src", "https://picsum.photos/100/50");
            attachmentMessage.setAttribute("alt", "Image aléatoire servie par picsum.photos");
        }
        
        containerAttachmentMessage.appendChild(attachmentMessage);
        // attachmentMessage.classList.add("ui", "small", "image");
        // attachmentMessage.classList.add("attachmentMessage");
        item.appendChild(containerAttachmentMessage);   

        const containerContent = document.createElement("div");
        containerContent.classList.add("content");

        const messageTitle = document.createElement("div");
        messageTitle.textContent = this.title;
        messageTitle.classList.add("header", "messageTitle");

        const messageAuthor = document.createElement("div");
        messageAuthor.classList.add("meta", "messageAuthor");
        messageAuthor.innerHTML = `<span>Écrit avec ❤ par l'utilisateur ${ this.userId }</span>`;
        
        const messageDescription = document.createElement("div");
        messageDescription.classList.add("description", "messageDescription");
        const messageDescriptionText = document.createElement("p");
        messageDescriptionText.textContent = this.description;
        messageDescription.appendChild(messageDescriptionText);

        containerContent.appendChild(messageTitle);
        containerContent.appendChild(messageAuthor);
        containerContent.appendChild(messageDescription);

        item.appendChild(containerContent);
        
        // containerItem.appendChild(item);

        return item;
    }

    // Add Append Comment HERE
}
