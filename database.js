// Учебные данные медицинской системы

export const patients = [
    { id: 1, fullName: "Иванов Иван Иванович", birthDate: "1985-04-12", phone: "+7 (900) 111-22-33", status: "Активен", doctor: "Д-р Смирнов", tags: "Постоянный пациент" },
    { id: 2, fullName: "Петрова Анна Сергеевна", birthDate: "1992-08-21", phone: "+7 (900) 222-33-44", status: "Активен", doctor: "Д-р Иванова", tags: "Плановый осмотр" },
    { id: 3, fullName: "Смирнова Мария Игоревна", birthDate: "2001-02-15", phone: "+7 (900) 333-44-55", status: "Активен", doctor: "Д-р Смирнов", tags: "Новый пациент" },
    { id: 4, fullName: "Кузнецов Алексей Викторович", birthDate: "1978-11-03", phone: "+7 (900) 444-55-66", status: "Активен", doctor: "Д-р Сидоров", tags: "Повторный приём" },
    { id: 5, fullName: "Соколова Елена Андреевна", birthDate: "1996-06-27", phone: "+7 (900) 555-66-77", status: "Активен", doctor: "Д-р Иванова", tags: "Консультация" }
];

export const appointments = [
    { id: 1, patientId: 1, doctor: "Д-р Смирнов", complaint: "Боль в груди", date: "2026-11-20", status: "Завершён", priority: "Высокий" },
    { id: 2, patientId: 2, doctor: "Д-р Иванова", complaint: "Плановый осмотр", date: "2026-11-21", status: "Завершён", priority: "Обычный" },
    { id: 3, patientId: 3, doctor: "Д-р Смирнов", complaint: "Кашель, температура", date: "2026-11-24", status: "Запланирован", priority: "Высокий" },
    { id: 4, patientId: 4, doctor: "Д-р Сидоров", complaint: "Головная боль", date: "2026-11-25", status: "Запланирован", priority: "Обычный" },
    { id: 5, patientId: 5, doctor: "Д-р Иванова", complaint: "Консультация", date: "2026-11-26", status: "Запланирован", priority: "Обычный" }
];

export const prescriptions = [
    { id: 1, appointmentId: 1, name: "ЭКГ", instruction: "Пройти обследование" },
    { id: 2, appointmentId: 2, name: "Общий анализ крови", instruction: "Сдать утром" },
    { id: 3, appointmentId: 3, name: "Питьевой режим", instruction: "Пить достаточно воды" },
    { id: 4, appointmentId: 4, name: "Консультация невролога", instruction: "Записаться к специалисту" },
    { id: 5, appointmentId: 5, name: "Контрольный осмотр", instruction: "Повторный приём" }
];
