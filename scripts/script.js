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
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (!name || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Exibir símbolo de carregamento
    document.getElementById("loading").style.display = "flex";

    // Simular atraso de 6 segundos
    setTimeout(() => {
        // Recuperar usuários existentes no localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Verificar se o e-mail já está cadastrado
        const userExists = users.find((user) => user.email === email);

        if (userExists) {
            alert("Este e-mail já está cadastrado.");
            document.getElementById("loading").style.display = "none";
            return;
        }

        // Adicionar novo usuário ao array
        users.push({ name, email, password });

        // Salvar os usuários no localStorage
        localStorage.setItem("users", JSON.stringify(users));

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
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (!password) {
        alert("Por favor, insira a senha.");
        return;
    }

    // Recuperar usuários existentes no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Procurar o usuário pelo e-mail
    const user = users.find((user) => user.email === email);

    if (!user) {
        alert("E-mail não encontrado. Verifique ou cadastre-se.");
        return;
    }

    // Verificar se a senha está correta
    if (user.password !== password) {
        alert("Senha inválida. Tente novamente.");
        return;
    }

    // Login bem-sucedido
    alert(`Bem-vindo, ${user.name}! Login realizado com sucesso.`);
}
