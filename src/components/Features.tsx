import CalendarIcon from "@/assets/icons/CalendarIcon";
import ExpenseIcon from "@/assets/icons/ExpenseIcon";
import IncomeIcon from "@/assets/icons/IncomeIcon";
import PieIcon from "@/assets/icons/PieIcon";
import SpeedIcon from "@/assets/icons/SpeedIcon";

const Features = () => {

    return (
        <div className="w-full flex flex-col place-items-center gap-[10vh]">

            <div className="w-full flex flex-col place-items-center gap-[20px]">
                <div className="fromLeft w-[45%] self-start border-b-2 pt-[1px] border-primary"></div>
                <div className="flex flex-col place-items-center place-content-center gap-[10px] text-primary">
                    <h3 className="fromRight font-bold text-[2rem]">Funcionalidades</h3>
                    <span className="fromLeft font-light text-[1rem]">Conocé las funcionalidades clave de numa</span>
                </div>
                <div className="fromRight w-[45%] self-end border-b-2 pt-[1px] border-primary"></div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-[10px] gap-y-[20px] px-[10px]">
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem]">Ingresos y Egresos</h4>

                    {/* Mobile Version */}
                    <div className="flex place-items-center gap-[10px]">
                        <IncomeIcon stroke="#00BC7D" />
                        <ExpenseIcon stroke="#00BC7D" />
                    </div>

                    {/* Desktop Version */}
                    <p className="text-[.75rem] tracking-wide leading-[15px] text-gray-700">Creá categorías personalizadas y registrá movimientos facilmente</p>
                </div>
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem]">Gráfico de Gastos</h4>

                    {/* Mobile Version */}
                    <PieIcon />

                    {/* Desktop Version */}
                    <p className="text-[.75rem] tracking-wide leading-[15px] text-gray-700">Visualizá tus egresos del mes con un gráfico de torta claro y útil</p>
                </div>
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem]">Historial y Control</h4>

                    {/* Mobile Version */}
                    <CalendarIcon />

                    {/* Desktop Version */}
                    <p className="text-[.75rem] tracking-wide leading-[15px] text-gray-700">Consultá tu historial y descubrí cuál fue tu último ingreso y egreso</p>
                </div>
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem]">Gestión optimizada</h4>

                    {/* Mobile Version */}
                    <SpeedIcon />

                    {/* Desktop Version */}
                    <p className="text-[.75rem] tracking-wide leading-[15px] text-gray-700">Eliminá y gestioná tus transacciones facilmente en cuestión de segundos</p>
                </div>
            </div>
        </div>
    );
};

export default Features;