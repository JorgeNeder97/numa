"use client";
import { useEffect, useState } from "react";
import { Testimonio } from "@/models/dataTypes";
import Image from "next/image";

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

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTestify, setSelectedTestify] = useState(testimonios[0]);
    const [loaded, setLoaded] = useState(false);

    const selectNewImage = (index: number, testimonios: Testimonio[], next = true) => {
        setLoaded(false);
        setTimeout(() => {
            const condition = next
                ? selectedIndex < testimonios.length - 1
                : selectedIndex > 0;
            const nextIndex = next
                ? condition
                    ? selectedIndex + 1
                    : 0
                : condition
                ? selectedIndex - 1
                : testimonios.length - 1;
            setSelectedTestify(testimonios[nextIndex]);
            setSelectedIndex(nextIndex);
        }, 500);
    };

    const previous = () => {
        selectNewImage(selectedIndex, testimonios, false);
    };

    const next = () => {
        selectNewImage(selectedIndex, testimonios);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            selectNewImage(selectedIndex, testimonios);
        }, 6000);
        return () => clearInterval(interval);
    }, [selectedTestify]);

    return (
        <div className="w-full flex flex-col place-items-center gap-[5vh]">
            <div className="w-full flex flex-col place-items-center gap-[20px]">
                <div className="fromLeft w-[45%] self-start border-b-2 pt-[1px] border-primary"></div>
                <div className="flex flex-col place-items-center place-content-center gap-[10px] text-primary">
                    <h3 className="fromRight font-bold text-[2rem]">
                        Resultados con Numa
                    </h3>
                    <span className="fromLeft font-light text-[1rem]">
                        Transformamos su forma de ver la plata
                    </span>
                </div>
                <div className="fromRight w-[45%] self-end border-b-2 pt-[1px] border-primary"></div>
            </div>

            <div className="w-[90%] px-[15px] py-[25px] flex flex-col gap-[20px] place-items-center rounded-md shadow-card-center">
                <div className="flex place-items-center gap-[25px] self-start pl-[20px]">
                    
                    {/* Las imagenes se deforman */}
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                        <Image src={selectedTestify.img} className="w-[80px]" width={200} height={200} alt={selectedTestify.nombre} />
                    </div>
                    <div className="w-[70%] flex flex-col place-items-start font-light">
                        <span className="text-[1rem] tracking-wide">{selectedTestify.nombre}</span>
                        <span className="text-[1rem] italic text-gray-600">{selectedTestify.rol}</span>
                    </div>
                </div>
                <div className="w-[90%] border-b-1 pt-[1px] border-gray-500"></div>
                <span className="max-w-[90%] text-[.875rem] italic text-gray-700 tracking-wide leading-[22px] font-light">{selectedTestify.texto}</span>

            </div>
        </div>
    );
};

export default Testimonios;
