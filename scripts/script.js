const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30"
];

// Função para carregar horários ocupados do Firestore
function getOccupiedTimes() {
    return firebase.firestore().collection('appointments').get().then(snapshot => {
        const occupied = {};
        snapshot.forEach(doc => {
            const data = doc.data();
            if (!occupied[data.date]) {
                occupied[data.date] = [];
            }
            occupied[data.date].push(data.time);
        });
        return occupied;
    });
}

// Função para salvar horário ocupado no Firestore
function saveOccupiedTime(date, time) {
    firebase.firestore().collection('appointments').add({
        date: date,
        time: time
    });
}

// Função para mostrar horários disponíveis na interface
function populateAvailableTimes() {
    const date = document.getElementById("appointmentDate").value;
    const timeSelect = document.getElementById("appointmentTime");

    getOccupiedTimes().then(occupied => {
        const occupiedForDate = occupied[date] || [];
        timeSelect.innerHTML = "";

        availableTimes.forEach((time) => {
            const option = document.createElement("option");
            option.value = time;
            if (occupiedForDate.includes(time)) {
                option.textContent = `${time} - Ocupado`;
                option.disabled = true;
            } else {
                option.textContent = `${time} - Disponível`;
            }
            timeSelect.appendChild(option);
        });
    });
}

// Função para agendar horário
function scheduleAppointment() {
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;

    if (!date || !time) {
        alert("Por favor, selecione uma data e horário.");
        return;
    }

    getOccupiedTimes().then(occupied => {
        if ((occupied[date] || []).includes(time)) {
            alert("Este horário já está ocupado. Escolha outro horário.");
            return;
        }

        // Salvar o horário como ocupado
        saveOccupiedTime(date, time);

        // Mensagem de confirmação e redirecionamento para WhatsApp
        alert(`Horário agendado com sucesso!\nData: ${date}\nHorário: ${time}`);
        const message = `Novo agendamento de corte de cabelo!\nData: ${date}\nHorário: ${time}`;
        const whatsappLink = `https://wa.me/5581997333714?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");

        // Atualizar a lista de horários disponíveis
        populateAvailableTimes();

        document.getElementById("appointmentConfirmation").style.display = "block";
    });
}

// Mostrar tela de cadastro
function showRegister() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "block";
}

// Mostrar tela de login
function showLogin() {
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
    document.getElementById("registerSuccessMessage").style.display = "none";
    document.getElementById("loading").style.display = "none";
}

// Função para validar e registrar usuário
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

    document.getElementById("loading").style.display = "flex";

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            firebase.firestore().collection('users').doc(user.uid).set({
                name: name,
                email: email
            });
            document.getElementById("loading").style.display = "none";
            document.getElementById("registerSuccessMessage").textContent = `Cadastro concluído, ${name}!`;
            document.getElementById("registerSuccessMessage").style.display = "block";
        })
        .catch(error => {
            document.getElementById("loading").style.display = "none";
            alert(error.message);
        });
}

// Validação de e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para realizar login
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
