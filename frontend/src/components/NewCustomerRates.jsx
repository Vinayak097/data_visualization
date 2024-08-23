import React, { useEffect } from 'react'
import Chart from './Chart';
import { useState } from 'react';
import axios from 'axios';
import { fetchNewCustomers } from '../services/apiService';
import Loading from './Loading';
function NewCustomerRates() {
    const [chartData, setChartData] = useState({});
    const [interval,setInterval]=useState();
    const [loading,setloading]=useState(false);
    useEffect(() => {
        const fetchData = async () => {
          setloading(true);
          const result = await fetchNewCustomers();
          
          
          
    
          setChartData({
            labels: result.map(item => item._id),
            datasets: [
              {
                label: 'new Customers',
                data: result  .map(item => item.count),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          });
          setloading(false)
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
      <h2 className="text-xl font-bold mb-4"> New customer growth </h2>
          <Chart chartData={chartData}></Chart>
    </div>
  )
}

export default NewCustomerRates