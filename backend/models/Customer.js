// models/Customer.js
const mongoose = require('mongoose');

 const AddressSchema = new mongoose.Schema({
  id: Number,
  customer_id: Number,
  first_name: String,
  last_name: String,
  company: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  zip: String,
  phone: String,
  name: String,
  province_code: String,
  country_code: String,
  country_name: String,
  default: Boolean
});

const CustomerSchema = new mongoose.Schema({
  _id: Number,
  addresses: [AddressSchema],
  admin_graphql_api_id: String,
  created_at: Date,
  currency: String,
  default_address: AddressSchema,
  email: String,
  email_marketing_consent: {
    state: String,
    opt_in_level: String,
    consent_updated_at: Date
  },
  first_name: String,
  id: Number,
  last_name: String,
  last_order_id: Number,
  last_order_name: String,
  multipass_identifier: String,
  note: String,
  orders_count: Number,
  phone: String,
  sms_marketing_consent: Object,
  state: String,
  tags: String,
  tax_exempt: Boolean,
  tax_exemptions: [String],
  total_spent: String,
  updated_at: Date,
  verified_email: Boolean
});

module.exports = mongoose.model('Customer', CustomerSchema, 'shopifyCustomers');

// models/Order.js


// models/Product.js
