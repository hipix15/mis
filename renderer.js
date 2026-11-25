// Функции для создания элементов страницы

function createTextElement(tagName, text, className = "") {
    const element = document.createElement(tagName);
    element.textContent = text;
    if (className) element.className = className;
    return element;
}

function getPatient(patientId, patients) {
    return patients.find(function(item) {
        return item.id === patientId;
    });
}

// Создаём одну строку таблицы приёмов
export function createAppointmentRow(appointment, patients) {
    const row = document.createElement("tr");
    const patient = getPatient(appointment.patientId, patients);

    row.append(createTextElement("td", patient ? patient.fullName : "Пациент не найден"));
    row.append(createTextElement("td", appointment.doctor));
    row.append(createTextElement("td", appointment.complaint));

    const dateCell = document.createElement("td");
    const date = document.createElement("time");
    date.dateTime = appointment.date;
    date.textContent = new Date(appointment.date + "T00:00:00").toLocaleDateString("ru-RU");
    dateCell.append(date);
    row.append(dateCell);

    const statusCell = document.createElement("td");
    const statusClass = appointment.status === "Запланирован" ? "status planned" : "status";
    statusCell.append(createTextElement("span", appointment.status, statusClass));
    row.append(statusCell);

    const priorityCell = document.createElement("td");
    const priorityClass = appointment.priority === "Высокий" ? "priority high" : "priority";
    priorityCell.append(createTextElement("span", appointment.priority === "Высокий" ? "🔴 Высокий" : "🟢 Обычный", priorityClass));
    row.append(priorityCell);
    return row;
}

// Создаём карточку приёма для переключения вида
export function createAppointmentCard(appointment, patients) {
    const patient = getPatient(appointment.patientId, patients);
    const card = document.createElement("article");
    card.className = "appointment-card";
    const heading = document.createElement("header");
    heading.append(createTextElement("strong", patient ? patient.fullName : "Пациент не найден"));
    heading.append(createTextElement("span", "№ " + appointment.id, "card-id"));
    card.append(heading);
    card.append(createTextElement("p", "Врач: " + appointment.doctor));
    card.append(createTextElement("p", "Жалоба: " + appointment.complaint));
    const date = document.createElement("time");
    date.dateTime = appointment.date;
    date.textContent = "Дата: " + new Date(appointment.date + "T00:00:00").toLocaleDateString("ru-RU");
    card.append(date);
    const statusClass = appointment.status === "Запланирован" ? "status planned" : "status";
    card.append(createTextElement("span", appointment.status, statusClass));
    const priorityClass = appointment.priority === "Высокий" ? "priority high" : "priority";
    card.append(createTextElement("span", appointment.priority === "Высокий" ? "🔴 Высокий приоритет" : "🟢 Обычный приоритет", priorityClass));
    return card;
}

// Создаём карточку пациента
export function createPatientItem(patient) {
    const item = document.createElement("li");
    item.className = "patient-card";
    const heading = document.createElement("header");
    heading.append(createTextElement("strong", patient.fullName));
    heading.append(createTextElement("span", "ID: " + patient.id, "card-id"));
    item.append(heading);
    item.append(createTextElement("span", "Телефон: " + patient.phone));

    const birthDate = document.createElement("time");
    birthDate.dateTime = patient.birthDate;
    birthDate.textContent = "Дата рождения: " + new Date(patient.birthDate + "T00:00:00").toLocaleDateString("ru-RU");
    item.append(birthDate);
    item.append(createTextElement("span", "Ответственный: " + patient.doctor));
    item.append(createTextElement("span", "Тег: " + patient.tags, "tag"));
    item.append(createTextElement("span", patient.status, "status"));
    return item;
}

// Создаём элемент списка назначений
export function createPrescriptionItem(prescription) {
    const item = document.createElement("li");
    item.append(createTextElement("strong", "№ " + prescription.id + " — " + prescription.name));
    item.append(createTextElement("span", prescription.instruction));
    item.append(createTextElement("span", "Приём № " + prescription.appointmentId, "card-id"));
    return item;
}
