// routes/analytics.js
const shopifyOrders=require('../models/Order')
const shopifyProducts =require('../models/Product')
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// 1. Total Sales Over Time
router.get('/total-sales', async (req, res) => {
    try {
      const { interval = 'monthly' } = req.query;
      let groupBy;
  
      switch (interval) {
        case 'daily':
          groupBy = { $dateToString: { format: "%Y-%m-%d", date: { $dateFromString: { dateString: "$created_at" } } } };
          break;
        case 'monthly':
          groupBy = { $dateToString: { format: "%Y-%m", date: { $dateFromString: { dateString: "$created_at" } } } };
          break;
        case 'quarterly':
          groupBy = {
            $concat: [
              { $dateToString: { format: "%Y-Q", date: { $dateFromString: { dateString: "$created_at" } } } },
              { $substr: [
                { $add: [
                  { $floor: { $divide: [{ $month: { $dateFromString: { dateString: "$created_at" } } }, 3] } },
                  1
                ] },
                0,
                1
              ] }
            ]
          };
          break;
        case 'yearly':
        default:
          groupBy = { $dateToString: { format: "%Y", date: { $dateFromString: { dateString: "$created_at" } } } };
      }
  
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: groupBy,
            totalSales: { $sum: { $toDouble: "$total_price" } }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json(totalSales);
    } catch (error) { 
      res.status(500).json({ message: error.message });
    }
  });
  
  
// 2. Sales Growth Rate Over Time

router.get('/sales-growth-rate', async (req, res) => {
    try {
      // Aggregate sales data by month
      const salesData = await Order.aggregate([
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            totalSales: { $sum: { $toDouble: "$total_price" } }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      // Calculate growth rates
      const growthRates = salesData.map((currentMonth, index) => {
        if (index === 0) return { date: currentMonth._id, growthRate: 0 };
        const previousMonth = salesData[index - 1];
        const growthRate = ((currentMonth.totalSales - previousMonth.totalSales) / previousMonth.totalSales) * 100;
        return { date: currentMonth._id, growthRate };
      });
  
      res.json(growthRates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// 3. New Customers Added Over Time
router.get('/new-customers', async (req, res) => {
    try {
      const newCustomers = await Customer.aggregate([
        // Convert created_at from string to Date
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        // Group by year and month and count the number of new customers
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            count: { $sum: 1 }
          }
        },
        // Sort results by date
        { $sort: { _id: 1 } }
      ]);
  
      res.json(newCustomers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get('/repeat-customers', async (req, res) => {
    try {
      const { interval = 'monthly' } = req.query;
      let groupBy;
  
      switch (interval) {
        case 'daily':
          groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$date" } };
          break;
        case 'monthly':
          groupBy = { $dateToString: { format: "%Y-%m", date: "$date" } };
          break;
        case 'quarterly':
          groupBy = {
            $concat: [
              { $dateToString: { format: "%Y-Q", date: "$date" } },
              { $substr: [{ $add: [{ $divide: [{ $month: "$date" }, 3] }, 0.9] }, 0, 1] }
            ]
          };
          break;
        case 'yearly':
        default:
          groupBy = { $dateToString: { format: "%Y", date: "$date" } };
      }
  
      const repeatCustomers = await Order.aggregate([
        {
          $addFields: {
            date: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        {
          $group: {
            _id: { email: "$customer.email", date: groupBy },
            orderCount: { $sum: 1 }
          }
        },
        {
          $match: { orderCount: { $gt: 1 } } // Filter for customers with more than 1 order
        },
        {
          $group: {
            _id: "$_id.date",
            repeatCustomers: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json(repeatCustomers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

// 5. Geographical Distribution of Customers
router.get('/customer-distribution', async (req, res) => {
    try {
      const distribution = await Customer.aggregate([
        {
          $project: {
            city: "$default_address.city"
          }
        },
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 20 }
      ]);
  
      res.json(distribution);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// 6. Customer Lifetime Value by Cohorts
router.get('/customer-lifetime-value', async (req, res) => {
    try {
      const cohorts = await Customer.aggregate([
        {
          $lookup: {
            from: 'shopifyOrders',
            localField: 'email',
            foreignField: 'email',
            as: 'orders'
          }
        },
        {
          $addFields: {
            // Convert created_at to Date if it's a string
            created_at_date: {
              $cond: {
                if: { $regexMatch: { input: "$created_at", regex: /^[0-9]{4}-[0-9]{2}-[0-9]{2}/ } },
                then: { $dateFromString: { dateString: "$created_at" } },
                else: "$created_at"
              }
            }
          }
        },
        {
          $project: {
            cohort: { $dateToString: { format: "%Y-%m", date: "$created_at_date" } },
            totalSpent: { $sum: { $map: { input: "$orders", as: "order", in: { $toDouble: "$$order.total_price" } } } }
          }
        },
        {
          $group: {
            _id: "$cohort",
            averageLifetimeValue: { $avg: "$totalSpent" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json(cohorts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
module.exports = router;