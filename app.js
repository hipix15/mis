// Главный файл приложения

import { patients, appointments, prescriptions } from "./database.js";
import {
    createAppointmentRow,
    createPatientItem,
    createPrescriptionItem
} from "./renderer.js";

// Элементы страницы
const appointmentsTable = document.querySelector("#appointments-table");
const patientsList = document.querySelector("#patients-list");
const prescriptionsList = document.querySelector("#prescriptions-list");
const searchInput = document.querySelector("#search");

// Показываем приёмы в таблице
function renderAppointments(data) {
    appointmentsTable.replaceChildren();

    data.forEach(function(appointment) {
        const row = createAppointmentRow(appointment, patients);
        appointmentsTable.append(row);
    });
}

// Показываем пациентов
function renderPatients() {
    patientsList.replaceChildren();

    patients.forEach(function(patient) {
        patientsList.append(createPatientItem(patient));
    });
}

// Показываем назначения
function renderPrescriptions() {
    prescriptionsList.replaceChildren();

    prescriptions.forEach(function(prescription) {
        prescriptionsList.append(createPrescriptionItem(prescription));
    });
}

// Выводим количество записей
function showStatistics() {
    document.querySelector("#patients-count").textContent = patients.length;
    document.querySelector("#appointments-count").textContent = appointments.length;
    document.querySelector("#prescriptions-count").textContent = prescriptions.length;
}

// Поиск по имени пациента и врачу
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredAppointments = appointments.filter(function(appointment) {
        const patientName = patients.find(function(patient) {
            return patient.id === appointment.patientId;
        });

        const name = patientName ? patientName.fullName.toLowerCase() : "";
        const doctor = appointment.doctor.toLowerCase();

        return name.includes(searchText) || doctor.includes(searchText);
    });

    renderAppointments(filteredAppointments);
});

// Запуск отображения данных
renderAppointments(appointments);
renderPatients();
renderPrescriptions();
showStatistics();
