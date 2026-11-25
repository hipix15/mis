// Функции для создания элементов страницы

function createTextElement(tagName, text, className = "") {
    const element = document.createElement(tagName);
    element.textContent = text;

    if (className) {
        element.className = className;
    }

    return element;
}

// Находим пациента по его id
function getPatientName(patientId, patients) {
    const patient = patients.find(function(item) {
        return item.id === patientId;
    });

    return patient ? patient.fullName : "Пациент не найден";
}

// Создаём одну строку таблицы приёмов
export function createAppointmentRow(appointment, patients) {
    const row = document.createElement("tr");

    const patientCell = document.createElement("td");
    patientCell.textContent = getPatientName(appointment.patientId, patients);

    const doctorCell = createTextElement("td", appointment.doctor);
    const complaintCell = createTextElement("td", appointment.complaint);

    const dateCell = document.createElement("td");
    const date = document.createElement("time");
    date.dateTime = appointment.date;
    date.textContent = new Date(appointment.date + "T00:00:00").toLocaleDateString("ru-RU");
    dateCell.append(date);

    const statusCell = document.createElement("td");
    const statusClass = appointment.status === "Запланирован" ? "status planned" : "status";
    statusCell.append(createTextElement("span", appointment.status, statusClass));

    row.append(patientCell, doctorCell, complaintCell, dateCell, statusCell);

    return row;
}

// Создаём элемент списка пациента
export function createPatientItem(patient) {
    const item = document.createElement("li");
    const name = createTextElement("strong", patient.fullName);
    const phone = createTextElement("span", "Телефон: " + patient.phone);

    const birthDate = document.createElement("time");
    birthDate.dateTime = patient.birthDate;
    birthDate.textContent = "Дата рождения: " +
        new Date(patient.birthDate + "T00:00:00").toLocaleDateString("ru-RU");

    item.append(name, phone, document.createElement("br"), birthDate);

    return item;
}

// Создаём элемент списка назначений
export function createPrescriptionItem(prescription) {
    const item = document.createElement("li");
    const name = createTextElement("strong", prescription.name);
    const instruction = createTextElement("span", prescription.instruction);

    item.append(name, instruction);
    return item;
}
