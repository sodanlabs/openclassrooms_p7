"use strict"

// Send user information to the server for register
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

// Check the validity of the information entered in the form
function checkDataToSignUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    if (document.getElementById("signupForm").checkValidity()) {
        const signupToSubmit = {
            username: username,
            email: email,
            password: password,
            isAdmin: isAdmin
        }
        submitSignup(signupToSubmit);
    } else {
        alert("Veuillez inscrire une valeur dans les champs vides ou en rouge pour valider le formulaire.");
    }
};

/*****************************************************************************/

// Display page content if valid auth
if (isLogged()) {
    window.location.href = "../index.html";

} else {
    const signupButton = document.getElementById('signup_submit_button');
    signupButton.addEventListener("click", (event) => {
        event.preventDefault();
        checkDataToSignUp();
    });
}