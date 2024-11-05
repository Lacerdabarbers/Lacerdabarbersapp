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

    // Simular atraso de 6 segundos
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}!`;
        document.getElementById("registerSuccessMessage").style.display = "block";
    }, 6000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function login() {
    // Lógica de login (pode adicionar verificação básica)
    alert("Login simulado! Implementar lógica de autenticação.");
}
