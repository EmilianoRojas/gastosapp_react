import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function CategoryChart({ data }) {
  // Agregar datos por categorías
  const categoryData = data.reduce((acc, item) => {
    const category = item.categories.name;
    const amount = item.amount;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  // Preparar datos para ECharts
  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Opción de ECharts
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: $ {c} ({d}%)',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              // El nombre de la categoría y el monto en líneas separadas
              return `${params.name}\n$${params.value}`;
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  };

  return <ReactECharts option={option} />;
}
