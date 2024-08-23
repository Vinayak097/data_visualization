
import './App.css'

import Sidebar from './components/Sidebar'
import { useRecoilValue } from 'recoil'

import { page } from './atoms/atoms'
import SalesGrowthRate from './components/SalesGrowthRate'
import NewCustomersOverTimeChart from './components/NewCustomerRates'

import ReapeaCust from './components/ReapeaCust'
import GeographicalDestribut from './components/GeographicalDestribut'
import LifeTimeValue from './components/LifeTimeValue'
import TotalSalesChart from './components/TotalChart'
import CustomerMap from './components/Map'


function App() {
  const paged=useRecoilValue(page)
  
  const renderChart = () => {
    switch (paged) {
      case 1:
        return <TotalSalesChart />;
      case 2:
        return <SalesGrowthRate />;
      case 3:
        return <NewCustomersOverTimeChart />;
      case 4:
        return <ReapeaCust />;
      case 5:
        return <GeographicalDestribut />;
      case 6:
        return <LifeTimeValue />;
      default:
        return <TotalSalesChart />;
    }
  };
  
  
  return (
    <>
    <div className="flex">
  <div className="hidden lg:block sticky top-0 h-screen">
    <Sidebar />
  </div>
  <div className=" w-full mx-2 p-2 overflow-hidden">
    
    {renderChart()}
  </div>
</div>
    </>
  )
}

export default App
