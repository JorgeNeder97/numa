# Numa – Administra tus finanzas personales 💰  
Una aplicación web moderna para visualizar y gestionar tus ingresos y gastos, desarrollada con Next.js + TypeScript + Prisma + PostgreSQL.

[🔗 Ver demo en producción](https://numa-kappa.vercel.app/)

## 🎯 ¿Por qué este proyecto?  
La gestión financiera personal es clave en la vida de muchas personas, pero a menudo las herramientas son complejas o poco amigables.  
Con “Numa” quise crear una solución limpia, accesible, fácil de usar, enfocada en mostrar mis habilidades en desarrollo web real: rutas dinámicas, manejo de datos, diseño responsivo y despliegue en la nube.

## 🚀 Funcionalidades destacadas  
- Registro de movimientos: ingresos y gastos categorizados.  
- Visualización clara de balances y totales.  
- Diseño **responsive**: experiencia óptima en escritorio, tablet y móvil.  
- Uso de componentes reutilizables en React/Next.js.  
- Datos gestionados mediante una base de datos configurada (PostgreSQL + Prisma ORM).  
- Optimización de rendimiento, fuentes e imágenes con Next.js.

## 🧰 Tecnologías utilizadas  
- [Next.js](https://nextjs.org) (estructura del proyecto, funcionalidades, APIRest interna, routing, optimización)  
- TypeScript  
- CSS / TailwindCSS  
- Base de datos: PostgreSQL + Prisma (ORM)
- Librerías adicionales: ApacheEcharts, Bcrypt, ScrollReveal, Framer-motion, Luxon, React-hook-form y DaisyUI
- ESLint (`eslint.config.mjs`)  
- Despliegue: Vercel 

## 📂 Estructura del proyecto  
```
.
├── prisma/             # esquemas de la base de datos  
├── public/             # assets públicos  
├── src/                # código fuente  
│   ├── app/            # rutas públicas, privadas y APIRest interna  
│   ├── assets/         # assets internos
│   ├── components/     # componentes reutilizables
│   ├── hooks/          # funciones especiales que modifican el estado de React y otros comportamientos
│   ├── libs/           # configuraciones de prisma y next-auth
│   ├── models/         # modelos de interfaces y tipos de Typescript
│   ├── utils/          # funciones reutilizables 
│   └── middleware.ts   # protección de rutas con next-auth
├── next.config.ts      # configuración de Next.js  
├── tsconfig.json       # configuración de TypeScript  
└── README.md  
```

## 🚀 Cómo instalar y ejecutar localmente (debes tener instalado NodeJS y PostgreSQL en tu ordenador)  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/JorgeNeder97/numa.git
   cd numa
   ```  
2. Instala dependencias:  
   ```bash
   npm install
   ```
3. Crea una Base de datos vacía en PostgreSQL.
4. Crea un archivo .env y define las siguientes variables:
   ```
   DATABASE_URL="postgresql://Usuario:Contraseña@localhost:5432/NombreDeLaDB?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="Mi codigo secreto (escribe lo que tu quieras)"
   ```
5. Ejecuta los siguientes comandos para migrar la base de datos y generar el cliente de prisma:
   ```
   npx prisma migrate dev
   npx prisma generate
   ```
6. Ejecuta el servidor de desarrollo:  
   ```bash
   npm run dev
   ```  
7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Despliegue  
La aplicación está desplegada y accesible en: [https://numa-kappa.vercel.app/](https://numa-kappa.vercel.app/)  
Fue implementada con Vercel, permitiendo despliegues automáticos y optimización web.
La base de datos esta implementada con Supabase en un plan gratuito (es limitada)

## 🔍 Lo que aprendí / Retos que superé  
- Reforcé mis conocimientos al estructurar un proyecto real con Next.js + TypeScript + PostgreSQL + Prisma desde cero.  
- Configuré y utilicé Prisma para modelar la base de datos y manejar datos de usuario.  
- Implementé diseño responsive y accesibilidad para asegurar experiencia óptima en todos los dispositivos.
- Implementé una APIRest interna con NextJS, exponiendo los endpoints para los CRUD necesarios.
- Reforcé mis conocimientos en autenticación y autorización con Next-auth.
- Optimizé imágenes/fuentes usando `next/image` y `next/font`.  
- Retos superados:
    -  Diseñar componentes reutilizables para los gráficos de gastos.
    -  Diseñar componentes adaptables a las distintas pantallas.
    -  Implementar animaciones al cargar datos y al montar componentes del dashboard.
    -  Añadir información del usuario en las credenciales y tokens que utiliza Next-auth.
    -  Implementar un sistema de autenticación y autorización con credenciales personalizadas en Next-auth (email y password).
    -  Implementar un MER (Modelo Entidad-Relacion) óptimo para el objetivo de la aplicación web.

## 📈 Mejoras a futuro  
- Añadir filtros de ingresos y egresos por categorías y fecha.  
- Implementar exportación de transacciones (CSV, PDF).  
- Añadir más gráficos analíticos para una mejor gestión financiera por parte del usuario.  
- Crear una versión Mobile con React-Native.  
- Añadir tests unitarios y de integración para asegurar calidad.
- Añadir mas funcionalidades analíticas y filtros.

## 📄 Licencia  
Este proyecto está bajo la licencia [Apache 2.0](LICENSE).  
