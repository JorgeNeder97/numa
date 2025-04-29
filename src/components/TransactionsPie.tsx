"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useAmountPerCategory } from "@/hooks/useAmountPerCategory";

const TransactionsPie = ({ type }: { type: number }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    const { amountPerCategory, loadingAmountPerCategory, amountPerCategoryError } = useAmountPerCategory(type);

    const data = amountPerCategory.map((item) => {
        return { value: item.total, name: item.categoryName };
    });

    useEffect(() => {

        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            title: {
                text: type == 1 ? "Ingresos del mes" : "Gastos del mes",
                left: "center",
            },
            tooltip: {
                trigger: "item",
            },
            color: type === 1 ? [
                "#91cc75",
                "#5470c6",
                "#73c0de",
                "#3ba272",
                "#fc8452",
                "#9a60b4",
                "#ea7ccc",
                "#ee6666",
            ] :
            [
                "#ee6666",
                "#9a60b4",
                "#fc8452",
                "#ea7ccc",
                "#91cc75",
                "#5470c6",
                "#73c0de",
                "#3ba272",
            ],
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

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default TransactionsPie;
