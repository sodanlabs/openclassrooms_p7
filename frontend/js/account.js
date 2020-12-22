"use strict"

// Delete user account
async function deleteAccount() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));
    try {
        let request = await fetch('http://localhost:3000/api/auth/deleteAccount', {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${authentification.token}`
            }
        });
        if (request.status == 201) {
            alert("Vous avez décidé de partir vers d'autres paysages plus radieux, vous allez nous manquer !");
            disconnectUser();
        } else {
            console.error('Response Erreur : ', response.status);
            alert("Rien ne s'est passé comme prévu");
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

// Fill user card with token auth
function fillInUserCard() {
    const authentification = JSON.parse(localStorage.getItem("Auth"));

    const userCardUserName = document.getElementById('userCardUserName');
    userCardUserName.textContent = authentification.username;

    const userCardId = document.getElementById('userCardId');
    userCardId.textContent = "Identifiant utilisateur: " + authentification.userId;
    userCardId.innerHTML = `<span>Identifiant utilisateur: </span>${authentification.userId}`;

    const userCardToken = document.getElementById('userCardToken');
    userCardToken.innerHTML = `<span>Token d'identification: </span>${authentification.token}`;
}

// Submit login to get auth token
async function submitLogin(loginToSubmit) {
    try {
        let response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginToSubmit)
        });
        if (response.ok) {
            const authentification = await response.json();

            localStorage.setItem('Auth', JSON.stringify(authentification));
            alert("Vous avez été identifié, nous vous redirigons vers la page principale");
            window.location.href = "../index.html";

        } else {
            console.error('Response Erreur : ', response.status);
            alert("Vous n'avez pas été identifié, veuillez recommencer avec la bonne adresse mail ou le bon mot de passe");
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

// Check the validity of the information entered in the form
function checkData() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (document.getElementById("loginForm").checkValidity()) {
        const loginToSubmit = {
            email: email,
            password: password
        }
        submitLogin(loginToSubmit);
    } else {
        alert("Veuillez inscrire une valeur dans les champs vides ou en rouge pour valider le formulaire.");
    }
}

/*****************************************************************************/

if (isLogged()) {
    toggleAccountPage();
    fillInUserCard();
    const deleteButton = document.getElementById('delete_button');
    deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteAccount();
    });
} else {
    const loginButton = document.getElementById('login_button');
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        checkData();
    });
}