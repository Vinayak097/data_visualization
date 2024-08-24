import axios from 'axios';

const API_BASE_URL = 'https://data-visualization-pi.vercel.app';

export const fetchTotalSales = async (interval) => {
    console.log("interval ",interval)
  const response = await axios.get(`${API_BASE_URL}/api/total-sales`,{
    params:{interval}
  });
  return response.data;
};

export const fetchSalesGrowth = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/sales-growth-rate`);
  return response.data;
};

export const fetchNewCustomers = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/new-customers`);
  return response.data;
};

export const fetchRepeatCustomers = async (interval) => {
  const response = await axios.get(`${API_BASE_URL}/api/repeat-customers`,{
    params:{interval}
  });
  return response.data;
};

export const fetchGeoDistribution = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/customer-distribution`);
  return response.data;
};

export const fetchCLVByCohort = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/customer-lifetime-value`);
  return response.data;
};
