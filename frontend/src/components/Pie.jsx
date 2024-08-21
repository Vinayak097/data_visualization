import React from 'react';
import '../App.css'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { lineChartData } from '../fake_data';
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
  Tooltip,
  Legend
    
)
function Pies() {
    const options={}
  return (
    <div className='line'>
        <Pie options={options}  data={lineChartData}></Pie>
    </div>
  )
}

export default Pies