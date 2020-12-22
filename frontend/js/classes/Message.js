"use strict";

class Messages {
    constructor(id, userId, title, description, attachment) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;

        if (attachment != null) {
            this.attachment = attachment;
        } else {
            this.attachment = "https://picsum.photos/600/400";
        }

        this.MessageTemplate = 
        `<div class="message_counter">
                <div class="message_counter_box">
                    <!-- <i class="arrow up icon"></i>
                    <i class="chart line icon"></i>
                    <i class="arrow down icon"></i> -->
                    <i class="fas fa-arrow-up"></i>
                    <i class="fas fa-chart-line"></i>
                    <i class="fas fa-arrow-down"></i>
                 </div>
            </div>
  
            <div class="message_body" href="">
                <div class="message_body_content">
                    <div class="message_body_content_meta">
                        <span class="message_body_content_author">Posted by Utilisateur ID:${this.userId} at ${Date.now()}</span>
                    </div>
                    <h3 class="message_body_content_header">${this.title}</h3>
                    <div class="message_body_content_description blur line_clamp">
                        <p>${this.description}</p>
                    </div>
                </div>
  
                <div class="message_body_image">
                    <img src="${this.attachment}" alt="Image offerte par ${this.userId} at ${Date.now()}">
                </div>

                <div class="message_body_modify invisible">
                <a id="modify_button" class="js-modal-open" href="#container-form"><i class="fas fa-edit"></i> Éditer</a>
                </div>
            </div>
        `
    }

    initMessage() {
        const message = document.createElement("a");
        message.id = `message_${this.id}`;
        message.setAttribute('href', "pages/message.html?id=" + this.id);
        message.classList.add("message");
        message.innerHTML = `${this.MessageTemplate}`;

        const postbox = document.getElementById('postbox');
        postbox.appendChild(message);
    }
}
