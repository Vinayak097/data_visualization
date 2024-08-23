import React, { useEffect } from 'react'
import Chart from './Chart';
import { useState } from 'react';
import { fetchCLVByCohort } from '../services/apiService';
import Loading from './Loading';
function LifeTimeValue() {
    const [chartData, setChartData] = useState({});
    const [loading,setloading]=useState(false);
    useEffect(() => {
        const fetchData = async () => {
          setloading(true)
          const result = await fetchCLVByCohort();
          
          setChartData({
            labels: result.map(item => item._id),
            datasets: [
              {
                label: 'customer Life time value',
                data: result.map(item => item.averageLifetimeValue),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          });
          setloading(false)
        };
    
        fetchData();
      }, []);
      if(loading){
        return(
          
          <Loading></Loading>
    
        )
      }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Life time value of customers</h2>
         <Chart chartData={chartData}></Chart>
    </div>
  )
}

export default LifeTimeValue