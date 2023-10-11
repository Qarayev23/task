import { Button } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { DiagramProps, TableDataProps } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Diagram = ({ tabulatorRef }: DiagramProps) => {
  const [show, setShow] = useState({ analysis_1: false, analysis_2: false });
  const tableData = tabulatorRef?.current?.current?.getData(true);

  const statusCounts = tableData?.reduce((counts: { [key: string]: number }, data: TableDataProps) => {
    const status = data.status;
    if (status !== undefined) {
      counts[status] = (counts[status] || 0) + 1;
    }
    return counts;
  }, {});

  const totalDataCount = tableData?.length || 0;

  const percentages = Object.keys(statusCounts).map((status) => {
    return ((statusCounts[status] / totalDataCount) * 100).toFixed(2);
  });

  const data = {
    labels: Object.keys(statusCounts).map((status, index) => {
      return `${status} (Count: ${statusCounts[status]}, Percentage: ${percentages[index]}%)`;
    }),
    datasets: [
      {
        label: 'Counts',
        data: Object.values(statusCounts),
        backgroundColor: ['#FF5733', '#33FF49', '#3391FF'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          generateLabels: function (chart: { data: any; }) {
            const data = chart.data;
            if (data?.labels?.length && data.datasets.length) {
              return data.labels.map(function (label: string, i: number) {
                return {
                  text: `${label}`,
                  fillStyle: data?.datasets[0]?.backgroundColor?.[i],
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.parsed.y;
            if (label !== undefined) {
              return `Count: ${label}`;
            }
            return "";
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='mt-5'>
      <div className="flex gap-3">
        <Button type='primary' onClick={() => setShow({ analysis_1: true, analysis_2: false })}>Analiz 1</Button>
        <Button type='primary' onClick={() => setShow({ analysis_1: false, analysis_2: true })}>Analiz 2</Button>
      </div>
      <div className='flex gap-10 mt-5'>
        {
          show.analysis_1 &&
          <div className='w-full lg:w-1/2 h-96'>
            <Pie data={data} options={options} width="100%" />
          </div>
        }
        {
          show.analysis_2 &&
          <div className='w-full lg:w-1/2 h-96'>
            <Bar data={data} options={options} width="100%" />
          </div>
        }
      </div>
    </div>
  );
};

export default Diagram;
