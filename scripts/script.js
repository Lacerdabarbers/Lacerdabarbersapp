const availableTimes = {
    "09:00": false,
    "09:30": false,
    "10:00": false,
    "10:30": false,
    "11:00": false,
    "11:30": false,
    "12:00": false,
    "12:30": false,
    "13:00": false,
    "13:30": false,
    "14:00": false,
    "14:30": false,
    "15:00": false,
    "15:30": false
};

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
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appointmentScreen").style.display = "block";
    populateAvailableTimes();
}

function populateAvailableTimes() {
    const date = document.getElementById("appointmentDate").value;
    const timeSelect = document.getElementById("appointmentTime");
    
    // Limpar as opções de horário
    timeSelect.innerHTML = "";

    // Adicionar horários disponíveis para o dia selecionado
    for (let time in availableTimes) {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = `${time} - ${availableTimes[time] ? "Ocupado" : "Disponível"}`;
        timeSelect.appendChild(option);
    }
}

function scheduleAppointment() {
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;

    if (!date || !time || availableTimes[time]) {
        alert("Este horário já está ocupado ou os dados estão incompletos.");
        return;
    }

    // Marcar o horário como ocupado
    availableTimes[time] = true;

    // Enviar mensagem para o WhatsApp
    const message = `Novo agendamento de corte de cabelo!\nData: ${date}\nHorário: ${time}`;
    const whatsappLink = `https://wa.me/5581997333714?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");

    document.getElementById("appointmentConfirmation").style.display = "block";
}
