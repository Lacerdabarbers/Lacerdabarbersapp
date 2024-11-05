// Função para mostrar a tela de registro
function showRegister() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "block";
}

// Função para mostrar a tela de login
function showLogin() {
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
    document.getElementById("registerSuccessMessage").style.display = "none";
    document.getElementById("loading").style.display = "none";
}

// Função para registrar o usuário
async function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const name = document.getElementById("registerName").value;

    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Exibir símbolo de carregamento
    document.getElementById("loading").style.display = "block";

    try {
        // Registrar o usuário usando Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Enviar e-mail de verificação
        await sendEmailVerification(user);
        document.getElementById("loading").style.display = "none";
        document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}! Verifique seu e-mail para validar sua conta.`;
        document.getElementById("registerSuccessMessage").style.display = "block";
    } catch (error) {
        document.getElementById("loading").style.display = "none";
        alert(error.message);
    }
}

// Função para validar o formato do e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para login (ainda não implementada)
function login() {
    // Lógica de login (pode adicionar verificação básica)
    alert("Login simulado! Implementar lógica de autenticação.");
}
