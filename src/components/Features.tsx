import CalendarIcon from "@/assets/icons/CalendarIcon";
import ExpenseIcon from "@/assets/icons/ExpenseIcon";
import IncomeIcon from "@/assets/icons/IncomeIcon";
import PieIcon from "@/assets/icons/PieIcon";
import SpeedIcon from "@/assets/icons/SpeedIcon";

const Features = () => {

    return (
        <div className="w-full flex flex-col place-items-center gap-[10vh] lg:gap-[15vh]">

            <div className="w-full flex flex-col place-items-center gap-[20px]">
                <div className="fromLeft w-[45%] self-start border-b-2 pt-[1px] border-primary"></div>
                <div className="flex flex-col place-items-center place-content-center gap-[10px] text-primary">
                    <h3 className="fromRight font-bold text-[2rem] lg:text-[2.5rem]">Funcionalidades</h3>
                    <span className="fromLeft font-light text-[1rem] lg:text-[1.1rem]">Conocé las funcionalidades clave de numa</span>
                </div>
                <div className="fromRight w-[45%] self-end border-b-2 pt-[1px] border-primary"></div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-[10px] lg:gap-x-[50px] gap-y-[20px] lg:gap-y-[50px] px-[10px]">
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem] lg:text-[1.5rem]">Ingresos y Egresos</h4>

                    {/* Mobile Version */}
                    <div className="lg:hidden flex place-items-center gap-[10px]">
                        <IncomeIcon stroke="#00BC7D" width="38px" height="38px" />
                        <ExpenseIcon stroke="#00BC7D" width="38px" height="38px" />
                    </div>

                    {/* Desktop Version */}
                    <div className="hidden lg:flex place-items-center gap-[10px]">
                        <IncomeIcon stroke="#00BC7D" width="60px" height="60px" />
                        <ExpenseIcon stroke="#00BC7D" width="60px" height="60px" />
                    </div>


                    <p className="text-[.75rem] lg:text-[1.1rem] lg:max-w-[400px] lg:leading-[24px] tracking-wide leading-[15px] text-gray-700">Creá categorías personalizadas y registrá movimientos facilmente</p>
                </div>
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem] lg:text-[1.5rem]">Gráfico de Gastos</h4>

                    {/* Mobile Version */}
                    <div className="lg:hidden">
                        <PieIcon width="20px" height="20px" />
                    </div>

                    {/* Desktop Version */}
                    <div className="hidden lg:flex place-items-center place-content-center mt-[6px] mb-[6px]">
                        <PieIcon width="30px" height="30px" />
                    </div>

                    <p className="text-[.75rem] lg:text-[1.1rem] lg:max-w-[400px] lg:leading-[24px] tracking-wide leading-[15px] text-gray-700">Visualizá tus egresos del mes con un gráfico de torta claro y útil</p>
                </div>
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem] lg:text-[1.5rem]">Historial y Control</h4>

                    {/* Mobile Version */}
                    <div className="lg:hidden">
                        <CalendarIcon width="23px" height="26px" />
                    </div>

                    {/* Desktop Version */}
                    <div className="hidden lg:flex place-items-center place-content-center mt-[7px] mb-[7px]">
                        <CalendarIcon width="30px" height="33px" />
                    </div>

                    <p className="text-[.75rem] lg:text-[1.1rem] lg:max-w-[400px] lg:leading-[24px] tracking-wide leading-[15px] text-gray-700">Consultá tu historial y descubrí cuál fue tu último ingreso y egreso</p>
                </div>
            
                <div className="featureCard fromBottom">
                    <h4 className="text-[1rem] lg:text-[1.5rem]">Gestión optimizada</h4>

                    {/* Mobile Version */}
                    <div className="lg:hidden">
                        <SpeedIcon width="26px" height="22px" />
                    </div>

                    {/* Desktop Version */}
                    <div className="hidden lg:flex place-items-center place-content-center mt-[6px] mb-[6px]">
                        <SpeedIcon width="36px" height="32px" />
                    </div>

                    <p className="text-[.75rem] lg:text-[1.1rem] lg:max-w-[400px] lg:leading-[24px] tracking-wide leading-[15px] text-gray-700">Eliminá y gestioná tus transacciones facilmente en cuestión de segundos</p>
                </div>
            </div>
        </div>
    );
};

export default Features;