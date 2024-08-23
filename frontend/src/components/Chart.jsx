import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
function Chart({chartData}) {
  return (
    <div className='w-full h-full'>
    {chartData.labels && <Line data={chartData} />}
    </div>
  )
}

export default Chart