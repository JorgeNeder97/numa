"use client";
import Image from "next/image";

const DesignFeatures = () => {

    return (
        <div className="w-full flex flex-col place-items-center gap-[10vh] md:gap-[15vh]">

             <div className="w-full flex flex-col place-items-center gap-[20px]">
                <div className="fromLeft w-[45%] self-start border-b-2 pt-[1px] border-tertiary"></div>
                <div className="flex flex-col place-items-center place-content-center gap-[10px] text-tertiary">
                    <h3 className="fromRight font-bold text-[2rem] lg:text-[2.5rem]">Diseño adaptable</h3>
                    <span className="fromLeft font-light text-[1rem] lg:text-[1.1rem]">Compatible con todos tus dispositivos</span>
                </div>
                <div className="fromRight w-[45%] self-end border-b-2 pt-[1px] border-tertiary"></div>
            </div>

            <div className="text-tertiary flex flex-col lg:flex-row place-items-center gap-[100px]">
                <div className="w-full relative pl-[50px] flex place-items-start place-content-center gap-[20px]">
                    <span className="fromLeft absolute top-2 left-[20px] lg:left-[1vw] font-semibold text-[1.7rem] md:text-[1.5rem] max-w-[120px] lg:max-w-[150px]">Desde tu celular</span>
                    <Image src={"/MobileV2.png"} draggable={false} className="fromCenter select-none pointer-events-none w-[70vw] max-w-[300px] md:w-[300px] lg:w-[300px]" width={600} height={800} alt="Version Móvil 2" />
                </div>

                <div className="w-full flex flex-col place-items-center gap-[20px]">
                    <span className="fromLeft font-semibold text-[1.7rem] md:text-[1.5rem]">Desde tu computadora</span>
                    <Image src={"/DesktopV1.png"} draggable={false} className="fromCenter select-none pointer-events-none w-[80vw] max-w-[350px] md:w-[350] lg:w-[500px]" width={1000} height={800} alt="Version Desktop" />
                </div>
            </div>
        </div>
    );
};

export default DesignFeatures;