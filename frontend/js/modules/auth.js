"use strict"

function isLogged() {
    // const auth = JSON.parse(localStorage.getItem('Auth'));
    const auth = true;
    if (!auth) {
        return false;
    } else {
        toggleHeaderButton();
        
        const authentification = {
            "userId": 1,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MDgyMjE0NjEsImV4cCI6MTYwODMwNzg2MX0.omfLCeE-XGUZUN10B_dLaUdtB-OQ70pPdlQ_2TbxeOc"
        };
        localStorage.setItem('Auth', JSON.stringify(authentification));
        return true;
    }
}