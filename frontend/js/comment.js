"use strict"

// Listen Post Button Comment on message page
function activePostCommentButton() {
    const postComment = document.getElementById('postComment');
    postComment.addEventListener('click', (event) => {
        event.preventDefault();
        checkDataCommentToSubmit();
    });
}

// Listen Delete Button Comment on message page
function activeDelCommentButton() {
    window.onload = function () {
        const arrayDelButtons = document.querySelectorAll(".delete_comment_button");

        arrayDelButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                deleteCommentFromDb(button.id.split('_')[1]);
            });
        });
    };
}

// Get the comment URI to send to fetch
function getUriToFetch() {
    const dataQuery = window.location.search;
    const messageId = dataQuery.replace("?id=", "");
    const URI = `http://localhost:3000/api/message/${messageId}/comment`;
    return URI;
}

// Delete a comment
async function deleteCommentFromDb(commentId) {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        const response = await fetch(getUriToFetch() + `/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.status == 201) {
            alert("Le message a bien été supprimé");
            document.location.reload();
        } else {
            alert("Rien ne s'est passé comme prévu");
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

// Check the length of the comment text entered in the form
function checkDataCommentToSubmit() {
    const textComment = document.getElementById('textComment').value;

    if (textComment.length > 3) {
        const commentToSubmit = {
            text: `${textComment}`
        }
        submitComment(commentToSubmit);

    } else {
        alert("Veuillez écrire un commentaire d'au moins 4 caractères");
    }
}

// Send the created comment to the server
async function submitComment(commentToSubmit) {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        let response = await fetch(getUriToFetch(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authentification.token}`
            },
            body: JSON.stringify(commentToSubmit)
        });
        if (response.ok) {
            document.location.reload();
        } else {
            console.error('Response Erreur : ', response.status);
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}




// Check if user rights to modify comment
function getIfUserCanModifyComment(authorComment, userId, userPermission) {
    if (authorComment == userId || userPermission == true) {
        return true;
    } else {
        return false;
    }
}

// Get all comments for one message
async function getAllComments() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        let response = await fetch("http://localhost:3000/api/message/" + getMessageId() + "/comment", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (response.ok) {
            const commentDataList = await response.json();

            commentDataList.forEach(comment => {
                const newComment = new Comments(comment.id, comment.userId, comment.text);
                newComment.initComment();


                // Test if user rights and display the form
                const userRights = getIfUserCanModifyComment(comment.userId, authentification.userId, authentification.isAdmin);

                if (userRights == true) {
                    const comment_body_modify = document.getElementById(`delete_comment_${comment.id}`);
                    comment_body_modify.classList.toggle('invisible');
                }
            });
            return true;
        } else {
            console.error('Response Erreur : ', response.status);
            const commentbox = document.getElementById("commentbox");
            const noComment = document.createElement('div');
            noComment.id = "noComment";
            noComment.classList.add('commentError');
            noComment.textContent = "Pas de commentaire actuellement";
            commentbox.appendChild(noComment);
            return false;
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}