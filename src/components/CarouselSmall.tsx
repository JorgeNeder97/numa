"use client";
import { useEffect, useState } from "react";
import { Testimonio } from "@/models/dataTypes";
import Image from "next/image";

const CarouselSmall = ({testimonios} : { testimonios: Testimonio[]}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTestify, setSelectedTestify] = useState(testimonios[0]);

    const selectNewImage = (
        index: number,
        testimonios: Testimonio[],
        next = true
    ) => {
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
        <div className="fromCenter w-[90%] h-[218px] px-[15px] py-[25px] flex flex-col gap-[20px] place-items-center rounded-md shadow-card-center">
            <div className="flex place-items-center gap-[25px] self-start pl-[20px]">

                <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full overflow-hidden relative">
                    <Image
                        src={selectedTestify.img}
                        className="object-cover"
                        fill
                        sizes="60px 60px"
                        alt={selectedTestify.nombre}
                    />
                </div>

                <div className="w-[70%] flex flex-col place-items-start font-light">
                    <span className="text-[1rem] tracking-wide">
                        {selectedTestify.nombre}
                    </span>
                    <span className="text-[1rem] italic text-gray-600">
                        {selectedTestify.rol}
                    </span>
                </div>
            </div>

            <div className="w-[90%] border-b-1 pt-[1px] border-gray-500"></div>
            
            <span className="max-w-[90%] text-[.875rem] italic text-gray-700 tracking-wide leading-[22px] font-light">
                {selectedTestify.texto}
            </span>
        </div>
    );
};

export default CarouselSmall;