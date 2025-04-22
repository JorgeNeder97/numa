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