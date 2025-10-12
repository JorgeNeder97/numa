import { DateTime } from "luxon";

export function getActualDate() {
    // Fecha actual (UTC)
    const fechaLuxon = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    
    // Restamos 3 horas para que la fecha en UTC simule UTC-3
    const fechaAjustada = fechaLuxon.minus({ hours: 3});

    // Le damos formato y la enviamos
    return fechaAjustada.toISO();
}

export function getFormatedActualDate() {
    const fechaActual = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const fecha = fechaActual.setLocale('es').toFormat("dd 'de' LLLL 'del' yyyy");
    return fecha;
}

export function formatDate(date: Date | string) {
    const fecha = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    return fecha.setLocale('es').toFormat("dd/MM");
};

export function formatDateToDDMMYYYY(date: Date | string) {
    const fecha = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    return fecha.setLocale('es').toFormat("dd/MM/yyyy");
}

export function formatDateToText(date: Date | string) {
    const fecha = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    return fecha.setLocale('es').toFormat("dd LLL. yyyy");
}