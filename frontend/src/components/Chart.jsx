import React from 'react'
import { Line } from 'react-chartjs-2'
import { TimeScale } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import zoomPlugin from 'chartjs-plugin-zoom';

// Registering components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  TimeScale
);

function Chart({chartData}) {
  return (
    <div className='w-full h-full'>
    {chartData.labels && <Line data={chartData} />}
    </div>
  )
}

export default Chart