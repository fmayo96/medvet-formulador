import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Register the pieces of Chart.js you'll use
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const EXAMPLE_DATA = {
  labels: ['Proteína', 'Grasa', 'Carbohidratos'],
  datasets: [
    {
      data: [48, 46, 6],
      backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1'],
    },
  ],
}

interface Props {
  title: string
  data: typeof EXAMPLE_DATA
}

const PieChart = ({ title, data }: Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%', // Controls the thickness of the donut (70% hole)
    layout: {
      padding: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'start' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataset = context.dataset.data
            const total = dataset.reduce((a: number, b: number) => a + b, 0)
            const value = context.parsed
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: ${percentage}%`
          },
        },
      },
      datalabels: {
        color: '#000',
        font: {
          size: 10,
          weight: 'bold' as const,
        },
        // @ts-expect-error
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0]
          // @ts-expect-error
          const total = dataset.data.reduce((a, b) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${percentage}%`
        },
        anchor: 'center' as const, // position relative to the arc (start, center, end)
        align: 'center' as const, // alignment relative to the chart radius (start, center, end)
        offset: 0, // moves the label slightly away from the arc
        clamp: false,
        clip: false,
      },
    },
  }

  return (
    <div className="w-70 h-70">
      <h1 className="font-semibold text-center mb-2">{title}</h1>

      <Doughnut data={data} options={options} />
    </div>
  )
}

export default PieChart
