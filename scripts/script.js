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
        // Salvar usuário no localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find((user) => user.email === email);

        if (userExists) {
            alert("Este e-mail já está cadastrado.");
            document.getElementById("loading").style.display = "none";
            return;
        }

        users.push({ name, email, password });
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

    // Verificar credenciais no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if (!user) {
        alert("E-mail não encontrado. Verifique ou cadastre-se.");
        return;
    }

    if (user.password !== password) {
        alert("Senha inválida. Tente novamente.");
        return;
    }

    alert(`Bem-vindo, ${user.name}! Login realizado com sucesso.`);

    // Esconder a tela de login e mostrar a tela de agendamento
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appointmentScreen").style.display = "block";
}

function scheduleAppointment() {
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    if (!appointmentDate || !appointmentTime) {
        alert("Por favor, preencha todos os campos para agendar.");
        return;
    }

    // Criar mensagem de agendamento para WhatsApp
    const message = `Olá, gostaria de agendar um corte para o dia ${appointmentDate} às ${appointmentTime}.`;

    // Codificar a mensagem para usar na URL do WhatsApp
    const whatsappMessage = encodeURIComponent(message);

    // Gerar o link do WhatsApp com os dados do agendamento
    const whatsappUrl = `https://wa.me/5581997333714?text=${whatsappMessage}`;

    // Abrir o link do WhatsApp
    window.open(whatsappUrl, '_blank');

    // Exibir a confirmação de agendamento na tela
    document.getElementById("appointmentConfirmation").style.display = "block";
}
