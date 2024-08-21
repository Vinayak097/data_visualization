import React, { useEffect } from 'react'
import Chart from './Chart';
import { useState } from 'react';
import axios from 'axios';
function NewCustomerRates() {
    const [chartData, setChartData] = useState({});
    const [interval,setInterval]=useState();
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get('http://localhost:8000/api/new-customers',{
               
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
    <div>
          <Chart chartData={chartData}></Chart>
    </div>
  )
}

export default NewCustomerRates