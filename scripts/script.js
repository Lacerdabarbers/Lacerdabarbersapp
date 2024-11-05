// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCfTgr7zZKs9jhHJ7DhittDeILWLNy8bf8",
    authDomain: "emails-107af.firebaseapp.com",
    projectId: "emails-107af",
    storageBucket: "emails-107af.firebasestorage.app",
    messagingSenderId: "740408050696",
    appId: "1:740408050696:web:c6bf3dd41a0a51bae1bdbd",
    measurementId: "G-PK2YFX9HN9"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showRegister() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "block";
}

function showLogin() {
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
    document.getElementById("registerSuccessMessage").style.display = "none";
    document.getElementById("loading").style.display = "none";
}

function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const name = document.getElementById("registerName").value;

    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    document.getElementById("loading").style.display = "block";

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            sendEmailVerification(userCredential.user)
                .then(() => {
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}! Verifique seu e-mail.`;
                    document.getElementById("registerSuccessMessage").style.display = "block";
                });
        })
        .catch((error) => {
            document.getElementById("loading").style.display = "none";
            alert(error.message); // Exibir mensagem de erro
        });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function login() {
    alert("Login simulado! Implementar lógica de autenticação.");
}
