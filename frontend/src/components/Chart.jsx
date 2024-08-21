import React from 'react'
import { Line } from 'react-chartjs-2'
function Chart({chartData}) {
  return (
    <div className='w-full h-full'>
    {chartData.labels && <Line data={chartData} />}
    </div>
  )
}

export default Chart