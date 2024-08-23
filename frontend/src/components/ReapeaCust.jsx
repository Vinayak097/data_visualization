import React, { useEffect } from 'react'
import Chart from './Chart';
import { useState } from 'react';
import axios from 'axios';
import { fetchRepeatCustomers } from '../services/apiService';
import Loading from './Loading';
function ReapeaCust() {
    const [chartData, setChartData] = useState({});
    const [interval,setInterval]=useState();
    const [loading,setloading]=useState(false);
    useEffect(() => {
        const fetchData = async () => {
          setloading(true);
          const result = await fetchRepeatCustomers(interval);
          setChartData({
            labels: result.map(item => item._id),
            datasets: [
              {
                label: 'reapeat Customer',
                data: result.map(item => item.repeatCustomers),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          });
          setloading(false);
        };
    
        fetchData();
      }, [interval]);
      if(loading){
        return(
          
          <Loading></Loading>

        )
      }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4"> Repeat Customers </h2>
       <select className='shadow cursor-pointer p-2'
        onChange={(e) => setInterval(e.target.value)}
        value={interval} 
      >
        <option value="monthly">Monthly</option>
        <option value="daily">Daily</option>
        <option value="yearly">Yearly</option>
        <option value="quarterly">Quarterly</option>
      </select>
      
         <Chart chartData={chartData}></Chart>
    </div>
  )
}

export default ReapeaCust