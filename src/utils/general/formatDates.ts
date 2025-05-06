import { DateTime } from "luxon";

// Probar esto para evitar el error en la fecha:
// Exactamente, ese es un comportamiento muy común: Prisma y PostgreSQL guardan automáticamente las fechas en UTC, y cuando una transacción se guarda por ejemplo a las 21:30 en UTC-3, eso corresponde a 00:30 del día siguiente en UTC, y puede "mover" tu transacción al día siguiente si estás usando .toUTC().toISO() con la hora activa.

// ✅ Solución: Guardar la fecha con hora ya ajustada a UTC-3
// En lugar de usar:


// const fechaISO = fechaLuxon.toUTC().toISO();
// Podés simplemente restar 3 horas manualmente antes de guardar, para forzar la hora ajustada a tu zona.

// ✔️ Código corregido


// import { DateTime } from "luxon";

// export function getActualDate() {
//   const fechaBuenosAires = DateTime.now().setZone("America/Argentina/Buenos_Aires");
  
//   // Restar 3 horas para compensar la conversión a UTC al guardar en DB
//   const fechaAjustada = fechaBuenosAires.minus({ hours: 3 });

//   return fechaAjustada.toISO(); // No hace falta convertir a UTC, ya está compensada
// }
// De esta forma:

// Prisma guarda la fecha en UTC, como siempre.

// Pero ya viene "ajustada" como si fuera UTC-3.

// Si son las 22:30 en Argentina, vas a guardar 2024-08-06T19:30:00.000Z, que sigue perteneciendo al 6 de agosto en tu zona horaria.


// El problema esta en que si usamos esta funcion, al crear 2 transacciones el mismo día el programa no
// entiende cual es la ultima y se desordenan


export function getActualDate() {
    // Fecha actual en UTC-3
    const fechaLuxon = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    
    const fechaAjustada = fechaLuxon.minus({ hours: 3});

    return fechaAjustada.toISO();

// Codigo Anterior

    // Setear la hora en 00:00:00
    // const fechaSinHora = fechaLuxon.startOf("day");

    // Convertir ISO con zona UTC para Prisma
    // const fechaISO = fechaSinHora.toUTC().toISO();

    // return fechaISO;
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