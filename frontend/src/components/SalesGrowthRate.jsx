
import React, { useEffect } from 'react'
import Chart from './Chart';
import { useState } from 'react';
import Loading from './Loading';
import { fetchSalesGrowth } from '../services/apiService';
function SalesGrowthRate() {
    const [chartData, setChartData] = useState({});
    const [loading,setloading]=useState(false);
    useEffect(() => {
        const fetchData = async () => {
          setloading(true)
          const result = await fetchSalesGrowth();
              setChartData({
            labels: result.map(item => item.date),
            datasets: [
              {
                label: 'Growth rate',
                data: result.map(item => item.growthRate),
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
      <h2 className="text-xl font-bold mb-4">Sales growth Rate</h2>
        <Chart chartData={chartData}></Chart>
        
    </div>
  )
}

export default SalesGrowthRate