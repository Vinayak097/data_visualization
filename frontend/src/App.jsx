import { useState } from 'react'
import LineGraph from './components/LineGraph'
import Pies from './components/Pie'
import Bars from './components/Bar'
import './App.css'
import { Bar } from 'react-chartjs-2'
import TotalSalesChart from './components/TotalChart'
import Sidebar from './components/Sidebar'
import { useRecoilValue } from 'recoil'
import { sideboard } from './atoms/atoms'
import { page } from './atoms/atoms'
import SalesGrowthRate from './components/SalesGrowthRate'
import NewCustomerRates from './components/NewCustomerRates'
import ReapeaCust from './components/ReapeaCust'
import GeographicalDestribut from './components/GeographicalDestribut'
import LifeTimeValue from './components/LifeTimeValue'


function App() {

  const [count, setCount] = useState(0)
  const paged=useRecoilValue(page)
  
  
  return (
    <>
    {/* <LineGraph></LineGraph>    
    
    <Bars></Bars>
    <Pies></Pies> */}
    
    <div className='flex'>
      <Sidebar></Sidebar>
      <div className={`${paged==1?"":"hidden" }  w-full`}>
      <TotalSalesChart></TotalSalesChart>
      </div>
       <div className={`${paged==2?"":"hidden" }  w-full`}>
      <SalesGrowthRate></SalesGrowthRate>
      </div>
     <div className={`${paged==3?"":"hidden" }  w-full`}>
      <NewCustomerRates></NewCustomerRates>
      </div>
      <div className={`${paged==4?"":"hidden" }  w-full`}>
      <ReapeaCust></ReapeaCust>
      </div>
      <div className={`${paged==5?"":"hidden" }  w-full`}>
      <GeographicalDestribut></GeographicalDestribut>
      </div>
      <div className={`${paged==6?"":"hidden" }  w-full`}>
      <LifeTimeValue></LifeTimeValue>
      </div>
      
    </div>
    


    
    </>
  )
}

export default App
