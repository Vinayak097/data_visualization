import React, { useEffect, useState, useRef } from 'react';

import { fetchTotalSales } from '../services/apiService';
import Loading from './Loading';
import Chart from './Chart';
function TotalSalesChart() {
  
  const [interval, setInterval] = useState("monthly"); 
  const [data,setChartData]=useState([]);
  const [loading ,setloading]=useState()

  useEffect(() => {
    const fetchAndRenderChart = async () => {
      setloading(true)
      const data = await fetchTotalSales(interval);
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
      setloading(false)
      
    };

    fetchAndRenderChart();
  }, [interval]);
  if(loading){
    return(
      
      <Loading></Loading>

    )
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Total Sales Over Time</h2>
      <select className='shadow cursor-pointer p-2 '
        onChange={(e) => setInterval(e.target.value)}
        value={interval} 
      >
        <option value="monthly">Monthly</option>s
        <option value="daily">Daily</option>
        <option value="yearly">Yearly</option>
        <option value="quarterly">Quarterly</option>
      </select>
      <Chart chartData={data}></Chart>
      
    </div>
  );
}


export default TotalSalesChart;
