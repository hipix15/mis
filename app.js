// Главный файл приложения
import { patients, appointments, prescriptions } from "./database.js";
import { createAppointmentRow, createAppointmentCard, createPatientItem, createPrescriptionItem } from "./renderer.js";

const appointmentsTable = document.querySelector("#appointments-table");
const patientsList = document.querySelector("#patients-list");
const prescriptionsList = document.querySelector("#prescriptions-list");
const searchInput = document.querySelector("#search");
const doctorFilter = document.querySelector("#doctor-filter");
const importantFilter = document.querySelector("#important-filter");
const statusInputs = document.querySelectorAll('input[name="status"]');
const viewInputs = document.querySelectorAll('input[name="view"]');
const tableView = document.querySelector("#table-view");
const cardsView = document.querySelector("#appointment-cards");
const resultsCount = document.querySelector("#results-count");

let currentSort = "date";
let sortDirection = 1;

function getPatientName(patientId) {
    const patient = patients.find(function(item) {
        return item.id === patientId;
    });
    return patient ? patient.fullName : "Пациент не найден";
}

function getFilteredAppointments() {
    const searchText = searchInput.value.toLowerCase();
    const selectedStatuses = [];
    statusInputs.forEach(function(input) {
        if (input.checked) selectedStatuses.push(input.value);
    });

    let filtered = appointments.filter(function(appointment) {
        const patientName = getPatientName(appointment.patientId).toLowerCase();
        const doctor = appointment.doctor.toLowerCase();
        const matchesSearch = patientName.includes(searchText) || doctor.includes(searchText);
        const matchesDoctor = doctorFilter.value === "all" || appointment.doctor === doctorFilter.value;
        const matchesStatus = selectedStatuses.includes(appointment.status);
        const matchesPriority = !importantFilter.checked || appointment.priority === "Высокий";
        return matchesSearch && matchesDoctor && matchesStatus && matchesPriority;
    });

    filtered.sort(function(a, b) {
        let first;
        let second;
        if (currentSort === "patient") {
            first = getPatientName(a.patientId);
            second = getPatientName(b.patientId);
        } else if (currentSort === "doctor") {
            first = a.doctor;
            second = b.doctor;
        } else {
            first = a.date;
            second = b.date;
        }
        if (first < second) return -1 * sortDirection;
        if (first > second) return 1 * sortDirection;
        return 0;
    });
    return filtered;
}

function renderAppointments() {
    const data = getFilteredAppointments();
    appointmentsTable.replaceChildren();
    cardsView.replaceChildren();

    data.forEach(function(appointment) {
        appointmentsTable.append(createAppointmentRow(appointment, patients));
        cardsView.append(createAppointmentCard(appointment, patients));
    });

    const selectedView = document.querySelector('input[name="view"]:checked').value;
    tableView.hidden = selectedView !== "table";
    cardsView.hidden = selectedView !== "cards";
    resultsCount.textContent = "Найдено записей: " + data.length;
}

function renderPatients() {
    patientsList.replaceChildren();
    patients.forEach(function(patient) {
        patientsList.append(createPatientItem(patient));
    });
}

function renderPrescriptions() {
    prescriptionsList.replaceChildren();
    prescriptions.forEach(function(prescription) {
        prescriptionsList.append(createPrescriptionItem(prescription));
    });
}

function showStatistics() {
    document.querySelector("#patients-count").textContent = patients.length;
    document.querySelector("#appointments-count").textContent = appointments.length;
    document.querySelector("#prescriptions-count").textContent = prescriptions.length;
}

searchInput.addEventListener("input", renderAppointments);
doctorFilter.addEventListener("change", renderAppointments);
importantFilter.addEventListener("change", renderAppointments);
statusInputs.forEach(function(input) {
    input.addEventListener("change", renderAppointments);
});
viewInputs.forEach(function(input) {
    input.addEventListener("change", renderAppointments);
});

document.querySelectorAll(".sort-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const newSort = button.dataset.sort;
        if (currentSort === newSort) {
            sortDirection = sortDirection * -1;
        } else {
            currentSort = newSort;
            sortDirection = 1;
        }
        document.querySelectorAll(".sort-button span").forEach(function(arrow) {
            arrow.textContent = "↕";
        });
        button.querySelector("span").textContent = sortDirection === 1 ? "↑" : "↓";
        renderAppointments();
    });
});

document.querySelector("#reset-filters").addEventListener("click", function() {
    searchInput.value = "";
    doctorFilter.value = "all";
    importantFilter.checked = false;
    statusInputs.forEach(function(input) {
        input.checked = true;
    });
    document.querySelector('input[name="view"][value="table"]').checked = true;
    renderAppointments();
});

renderAppointments();
renderPatients();
renderPrescriptions();
showStatistics();
