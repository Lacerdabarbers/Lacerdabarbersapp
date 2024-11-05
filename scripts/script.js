// script.js

// Importando as funções do Firebase
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Inicializando o Auth
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

    // Criar usuário no Firebase
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário criado com sucesso
            const user = userCredential.user;

            // Enviar e-mail de verificação
            sendEmailVerification(user).then(() => {
                // Mensagem de sucesso
                document.getElementById("loading").style.display = "none";
                document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}! Verifique seu e-mail para confirmar.`;
                document.getElementById("registerSuccessMessage").style.display = "block";
            });
        })
        .catch((error) => {
            // Erro ao criar usuário
            document.getElementById("loading").style.display = "none";
            alert(error.message);
        });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Exibir símbolo de carregamento
    document.getElementById("loading").style.display = "block";

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            document.getElementById("loading").style.display = "none";
            alert("Login realizado com sucesso!");
            // Redirecionar ou fazer outras ações após o login
        })
        .catch((error) => {
            // Erro ao fazer login
            document.getElementById("loading").style.display = "none";
            alert(error.message);
        });
}
