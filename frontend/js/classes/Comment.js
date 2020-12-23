"use strict";

class Comments {
    constructor(id, userId, text) {
        this.id = id;
        this.userId = userId;
        this.text = text;

        this.CommentTemplate =
            `<div class="comment_body_content_meta">
                <span class="comment_body_content_author">Commentaire ID:${this.id} posted by Utilisateur ID:${this.userId}</span>
            </div>
            <div class="comment_body_content_description">
                <p>${this.text}</p>
            </div>
      
            <div id="delete_comment_${this.id}" class="comment_body_modify invisible">
                <button id="commentDelBtn_${this.id}" class="delete_comment_button"><i class="fas fa-dumpster"></i> Supprimer</button>
            </div>
        `;
    }

    initComment() {
        const comment = document.createElement("div");
        comment.id = `comment_${this.id}`;
        comment.classList.add("comment");
        comment.innerHTML = `${this.CommentTemplate}`;

        const listOfComment = document.getElementById('listOfComment');
        listOfComment.appendChild(comment);
    }
}
