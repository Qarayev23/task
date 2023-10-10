import { Button } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Diagram = ({ tabulatorRef }) => {
  const tableData = tabulatorRef?.current?.current?.getData(true);

  const statusCounts = tableData?.reduce((counts, data) => {
    const status = data.status;
    counts[status] = (counts[status] || 0) + 1;
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
      tooltip: {
        callbacks: {
          label: function () {
            return "";
          },
        },
      },
    },
  };

  return (
    <div className='mt-5'>
      <div className='p-8 w-1/2'>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Diagram;
