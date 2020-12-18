"use strict"

// Envoyer les informations pour enregistrer un nouvel utilisateur  au serveur
async function submitSignup(signupToSubmit) {
    try {
        let response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupToSubmit)
        });
        if (response.ok) {
            const authentification = await response.json();

            localStorage.setItem('Auth', JSON.stringify(authentification));
            alert("Vous avez été enregisré, nous vous redirigons vers la page de connexion");
            window.location.href = "../pages/account.html";

        } else if (response.status == 400) {
            console.error('Response Erreur : ', response.status);
            alert("Un utilisateur avec cette adresse mail est déjà enregistré!");
        } else {
            console.error('Response Erreur : ', response.status);
            alert("Une erreur est survenue, veuillez nous en excuser");
        }
    } catch (error) {
        console.error('Catch Erreur : ', error);
    }
}

// Vérifier les informations du formulaire soient valident avant de l'envoyer au serveur
function checkDataToSignUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (document.getElementById("signupForm").checkValidity()) {
        const signupToSubmit = {
            username: username,
            email: email,
            password: password
        }
        submitSignup(signupToSubmit);
    } else {
        alert("Veuillez inscrire une valeur dans les champs vides ou en rouge pour valider le formulaire.");
    }
};

/*****************************************************************************/

if (isLogged()) {
    toggleSignupPage();
    alert("Vous êtes déjà inscrit, vous allez être redirigé vers la page principale");
    window.location.href = "../index.html";

} else {
    console.log("je ne suis pas loggué")
    const signupButton = document.getElementById('signup_button');
    signupButton.addEventListener("click", (event) => {
        event.preventDefault();
        checkDataToSignUp();
    });
}