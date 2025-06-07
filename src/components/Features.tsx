import revealElements from "@/hooks/scrollReveal";
import { useEffect } from "react";

const Features = () => {

    useEffect(() => {
        revealElements();
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col place-items-center gap-[20px]">
                <div className="fromLeft w-[45%] self-start border-b-2 pt-[1px] border-primary"></div>
                <div className="flex flex-col place-items-center place-content-center gap-[10px] text-primary">
                    <h3 className="fromRight font-bold text-[2rem]">Funcionalidades</h3>
                    <span className="fromLeft font-light text-[1rem]">Conocé las funcionalidades clave de numa</span>
                </div>
                <div className="fromRight w-[45%] self-end border-b-2 pt-[1px] border-primary"></div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-[10px]">
                <div className="featureCard">
                    <h4>Ingresos y Egresos</h4>
                    <span></span>
                    <p>Creá categorías personalizadas y registrá movimientos facilmente</p>
                </div>
                <div className="featureCard">
                    <h4>Gráfico de Gastos</h4>
                    <span></span>
                    <p>Visualizá tus egresos del mes con un gráfico de torta claro y útil</p>
                </div>
                <div className="featureCard">
                    <h4>Historial y Control</h4>
                    <span></span>
                    <p>Consultá tu historial y descubrí cuál fue tu último ingreso y egreso</p>
                </div>
                <div className="featureCard">
                    <h4>Gestión optimizada</h4>
                    <span></span>
                    <p>Eliminá y gestioná tus transacciones facilmente en cuestión de segundos</p>
                </div>
            </div>
        </div>
    );
};

export default Features;