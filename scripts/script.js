// scripts/script.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

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

    // Exibir símbolo de carregamento
    document.getElementById("loading").style.display = "block";

    // Registrar o usuário com Firebase
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            const user = userCredential.user;
            document.getElementById("loading").style.display = "none";
            document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}!`;
            document.getElementById("registerSuccessMessage").style.display = "block";
        })
        .catch((error) => {
            document.getElementById("loading").style.display = "none";
            alert("Erro ao registrar: " + error.message);
        });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            alert("Login bem-sucedido!");
            // Você pode redirecionar o usuário ou executar outra lógica aqui
        })
        .catch((error) => {
            alert("Erro ao fazer login: " + error.message);
        });
}
