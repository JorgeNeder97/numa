import CarouselSmall from "./CarouselSmall";

const Testimonios = () => {
    const testimonios = [
        {
            nombre: "Martina R.",
            rol: "Estudiante universitaria",
            texto: '"Desde que uso Numa, tengo el control total de mis finanzas. La interfaz es súper clara y puedo ver todo desde mi celular o la compu."',
            estrellas: 5,
            img: "/martina.jpg",
        },
        {
            nombre: "Julián S.",
            rol: "Diseñador gráfico freelance",
            texto: '"Con Numa empecé a ahorrar sin darme cuenta. La gráfica de gastos me ayudó muchísimo."',
            estrellas: 5,
            img: "/julian.jpg",
        },
        {
            nombre: "Claudia D.",
            rol: "Emprendedora",
            texto: '"Probé varias apps, pero ninguna tan simple y completa como Numa. Es como tener un asesor financiero en el bolsillo."',
            estrellas: 5,
            img: "/claudia.jpg",
        },
        {
            nombre: "Tomás E.",
            rol: "Analista contable",
            texto: '"Lo que más valoro de Numa es que se adapta a mí. Uso la versión web en el trabajo y el celular cuando estoy afuera."',
            estrellas: 5,
            img: "/tomas.jpg",
        },
        {
            nombre: "Sofía y Matías",
            rol: "Pareja joven",
            texto: '"Mi pareja y yo usamos Numa para organizar nuestros gastos compartidos. Nos ayudó a dejar de pelear por plata."',
            estrellas: 5,
            img: "/sofiaymatias.jpg",
        },
    ];


    return (
        <div className="w-full flex flex-col place-items-center gap-[8vh] md:gap-[13vh]">
            <div className="w-full flex flex-col place-items-center gap-[20px]">
                <div className="fromLeft w-[45%] self-start border-b-2 pt-[1px] border-primary"></div>
                <div className="flex flex-col place-items-center place-content-center gap-[10px] text-primary">
                    <h3 className="fromRight font-bold text-[2rem] lg:text-[2.5rem]">
                        Resultados con Numa
                    </h3>
                    <span className="fromLeft font-light text-[1rem] lg:text-[1.1rem]">
                        Transformamos su forma de ver la plata
                    </span>
                </div>
                <div className="fromRight w-[45%] self-end border-b-2 pt-[1px] border-primary"></div>
            </div>

            <div className="w-full flex place-content-center">
                <CarouselSmall testimonios={testimonios} />
            </div>
        </div>
    );
};

export default Testimonios;
