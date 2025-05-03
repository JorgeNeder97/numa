"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { truncateString } from "@/utils/general/strings";
import { useAmountPerCategory } from "@/hooks/useAmountPerCategory";

const TransactionsPie = ({ type }: { type: number }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const { amountPerCategory, loadingAmountPerCategory, amountPerCategoryError } = useAmountPerCategory(type);
    console.log(amountPerCategory);
    const data = amountPerCategory.map((item) => {
        return { value: item.total, name: truncateString(item.categoryName, 28) };
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
                    color: "#00bc7d"
                }
            },
            tooltip: {
                trigger: "item",
            },
            // color: type === 1 ? [
            //     "#91cc75",
            //     "#5470c6",
            //     "#73c0de",
            //     "#3ba272",
            //     "#fc8452",
            //     "#9a60b4",
            //     "#ea7ccc",
            //     "#ee6666",
            // ] :
            // [
            //     "#ff3333",
            //     "#eacc1c",
            //     "#91cc75",
            //     "#5470c6",
            //     "#fc8452",
            //     "#9a60b4",
            //     "#73c0de",
            //     "#3ba272",
            // ],
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

        // Limpieza al desmontar el componente
        return () => {
            myChart.dispose();
        };
    }, [amountPerCategory]);

    if(amountPerCategory.length === 0) return (
        <div className="w-full min-h-[200px] flex flex-col gap-[20px] place-content-center place-items-center">
            <span className="">Aún no registraste ningún movimiento</span>            
        </div>
    );
    
    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} className="pt-[20px]" />;
};

export default TransactionsPie;
