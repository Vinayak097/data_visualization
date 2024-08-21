import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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
import axios from 'axios';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const TotalSalesChart = () => {
  const [chartData, setChartData] = useState({});
  const [interval,setInterval]=useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8000/api/total-sales',{
            params: {
              interval: interval
            }
      });

      const data = result.data;
      console.log(data);

      setChartData({
        labels: data.map(item => item._id),
        datasets: [
          {
            label: 'Total Sales',
            data: data.map(item => item.totalSales),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    };

    fetchData();
  }, [interval]);

  return (
    <div className='flex-1  flex-col'>
        
       
        <div className='w-full flex mx-16 items-center'>
            <label htmlFor="time">TimePeriod : </label>
        <select id='time' name='time' className='oultline-none p-1  border-blue-400 float-start' onChange={(e)=>{setInterval(e.target.value)}}>
            <option value="monthly">monthly</option>
            <option value="daily">daily</option>
            <option value="quarterly">quarterly</option>
             <option value="yearly">yearly</option>
            </select>

        </div>

        
            <div className='w-full h-full'>
            {chartData.labels && <Line data={chartData} />}
            </div>
        
        </div>
      
    
  );
};

export default TotalSalesChart;