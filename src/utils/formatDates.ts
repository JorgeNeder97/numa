import { DateTime } from "luxon";

export function getActualDate() {
    // Fecha actual en UTC-3
    const fechaLuxon = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    
    // Setear la hora en 00:00:00
    const fechaSinHora = fechaLuxon.startOf("day");

    // Convertir ISO con zona UTC para Prisma
    const fechaISO = fechaSinHora.toUTC().toISO();

    return fechaISO;
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

export function formatDateToText(date: Date | string) {
    const fecha = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    return fecha.setLocale('es').toFormat("dd LLL. yyyy");
}