import React, { useState, useEffect } from 'react';
import { fetchSalesReport, fetchTopSellingProducts, fetchTopClients } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date(defaultEndDate);
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 4);

  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(defaultEndDate.toISOString().slice(0, 10));

  const [salesReport, setSalesReport] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topClients, setTopClients] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const salesData = await fetchSalesReport(startDate, endDate);
      setSalesReport(salesData);

      const topProductsData = await fetchTopSellingProducts(startDate, endDate);
      const transformedTopProductsData = transformTopProductsData(topProductsData);
      setTopSellingProducts(transformedTopProductsData);

      const topClientsData = await fetchTopClients(startDate, endDate);
      const transformedTopClientsData = transformTopClientsData(topClientsData);
      setTopClients(transformedTopClientsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="report-container">
      <div className="sales-report-container">
        <div className="chart">
          <h2>Sales Report</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesReport}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <form onSubmit={handleSubmit} className="date-form">
          <label>
            Select Start Date:
            <input type="date" value={startDate} onChange={handleStartDateChange} />
          </label>
          <label>
            Select End Date:
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h2>Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="productName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantitySold" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h2>Top Clients</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topClients}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="clientName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPurchases" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const transformTopClientsData = (data) => {
  return data.map(item => ({
    clientName: item[0].nom,
    totalPurchases: item[1]
  }));
};

const transformTopProductsData = (data) => {
  return data.map(item => ({
    productName: item[0].nom,
    quantitySold: item[1]
  }));
};

export default Report;
