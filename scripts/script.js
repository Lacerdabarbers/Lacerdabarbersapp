// script.js
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

    document.getElementById("loading").style.display = "block";

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById("loading").style.display = "none";
            document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}!`;
            document.getElementById("registerSuccessMessage").style.display = "block";
        })
        .catch((error) => {
            alert("Erro: " + error.message);
            document.getElementById("loading").style.display = "none";
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
            alert("Login bem-sucedido!");
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
}
