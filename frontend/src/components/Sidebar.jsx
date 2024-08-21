import React from 'react';
import { useRecoilState } from 'recoil';
import { page } from '../atoms/atoms';

export const pages = {
  "total_sales": 1,
  "sales_growth_rate": 2,
  "New_customer_over_time": 3,
  "repeat_customer": 4,
  "Geographical_Distribution": 5,
  "Customer_Lifetime_Value": 6
};

function Sidebar() {
  const [paged, setPage] = useRecoilState(page);

  function changePage(pageKey) {
    
    console.log(paged)
    setPage(pages[pageKey]);
    
  }

  return (
    <div className="h-screen bg-gray-800 text-white w-44">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ul className="mt-6">
          <li className="mb-4">
            <button onClick={() => changePage("total_sales")} className="hover:text-gray-400">Total Sales Over Time</button>
          </li>
          <li className="mb-4">
            <button onClick={() => changePage("sales_growth_rate")} className="hover:text-gray-400">Sales Growth Rate</button>
          </li>
          <li className="mb-4">
            <button onClick={() => changePage("New_customer_over_time")} className="hover:text-gray-400">New Customers Over Time</button>
          </li>
          <li className="mb-4">
            <button onClick={() => changePage("repeat_customer")} className="hover:text-gray-400">Repeat Customers</button>
          </li>
          <li className="mb-4">
            <button onClick={() => changePage("Geographical_Distribution")} className="hover:text-gray-400">Geographical Distribution</button>
          </li>
          <li className="mb-4">
            <button onClick={() => changePage("Customer_Lifetime_Value")} className="hover:text-gray-400">Customer Lifetime Value</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
