import React from 'react';
import '../App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { lineChartData } from '../fake_data';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,    
    Title,
    Tooltip,
    Legend
)
function Bars() {
    const options={}

  return (
    <div className='line'> 
        <Bar  options={options} data={lineChartData}
        ></Bar>
        
    </div>
  )
}

export default Bars