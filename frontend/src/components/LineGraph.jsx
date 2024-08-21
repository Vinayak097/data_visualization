import React from 'react';
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
import { lineChartData } from '../fake_data';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function LineGraph() {
    const options={};

    


  return (
    <div className='line'>
        <Line className='' options={options} data={lineChartData}></Line>
    </div>
    
  )
}

export default LineGraph
