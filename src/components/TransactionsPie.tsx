import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useAmountPerCategory } from '@/hooks/useAmountPerCategory';


const TransactionsPie = (type:number) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ver como agregar estos datos al grafico
    const {amountPerCategory, loadingAmountPerCategory, amountPerCategoryError} = useAmountPerCategory(type)
    
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    
    const option: echarts.EChartsOption = {
      title: {
        text: 'Gastos del mes',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      color: ['#5470c6', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      series: [
        {
          name: 'Egresos',
          type: 'pie',
          radius: '50%',
          colorBy: "data",
          data: [
            // Ver como traer desde la base de datos la suma de todas las transacciones separadas por categoría
            // Ej: la suma de gastos varios, la suma de clases de ingles, etc...
            { value: 1048, name: 'Gastos Varios' },
            { value: 735, name: 'Clases de Inglés' },
            { value: 580, name: 'Higiene personal' },
            { value: 484, name: 'Teléfono' },
            { value: 300, name: 'Comida' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);

    // Limpieza al desmontar el componente
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default TransactionsPie;
