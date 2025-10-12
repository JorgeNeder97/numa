"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { truncateString } from "@/utils/general/strings";
import { useAmountPerCategory } from "@/hooks/useAmountPerCategory";

const TransactionsPie = ({ type }: { type: number }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const { amountPerCategory, loadingAmountPerCategory, amountPerCategoryError } = useAmountPerCategory(type);

    const data = amountPerCategory.map((item) => {
        return { value: item.total, name: truncateString(item.categoryName, 23) };
    });

    useEffect(() => {

        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            title: {
                text: type == 1 ? "Ingresos del mes" : "Gastos del mes",
                left: "center",
                textStyle: {
                    fontSize: "28px",
                    fontFamily: "Kanit",
                    color: "#00754E"
                }
            },
            tooltip: {
                trigger: "item",
            },
            series: [
                {
                    name: type == 1 ? "Ingresos" : "Egresos",
                    type: "pie",
                    radius: "50%",
                    colorBy: "data",
                    data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };

        myChart.setOption(option);

        // Adapta el grafico al ancho de la pantalla
        const handleResize = () => {
            myChart.resize();
        };

        // Al adaptarse la pantalla ejecuta la función de arriba
        window.addEventListener("resize", handleResize);

        // Limpieza al desmontar el componente
        return () => {
            window.removeEventListener("resize", handleResize);
            myChart.dispose();
        };
    }, [amountPerCategory]);

    if(!loadingAmountPerCategory && amountPerCategory.length == 0) return (
        <div className="w-full min-h-[200px] flex flex-col gap-[20px] place-content-center place-items-center">
            <span className="">Aún no registraste ningún gasto</span>            
        </div>
    );

    if(loadingAmountPerCategory) return <span className="loading loading-spinner text-success"></span>
    
    if(amountPerCategoryError) return (
        <div className="w-full min-h-[200px] flex flex-col gap-[20px] place-content-center place-items-center">
            <span className="">Se produjo un error al calcular tus transacciones</span>            
        </div>
    );

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} className="pt-[20px]" />;
};

export default TransactionsPie;
