const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  position: Number,
  values: [String]
});

const VariantSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  title: String,
  price: Number,
  sku: String,
  position: Number,
  inventory_policy: String,
  compare_at_price: Number,
  fulfillment_service: String,
  inventory_management: String,
  option1: String,
  option2: String,
  option3: String,
  created_at: Date,
  updated_at: Date,
  taxable: Boolean,
  barcode: String,
  grams: Number,
  weight: Number,
  weight_unit: String,
  inventory_item_id: Number,
  inventory_quantity: Number,
  old_inventory_quantity: Number,
  requires_shipping: Boolean,
  admin_graphql_api_id: String,
  image_id: Number
});

const ProductSchema = new mongoose.Schema({
  _id: Number,
  admin_graphql_api_id: String,
  body_html: String,
  created_at: Date,
  handle: String,
  id: Number,
  image: Object,
  images: [Object],
  options: [OptionSchema],
  product_type: String,
  published_at: Date,
  published_scope: String,
  status: String,
  tags: String,
  template_suffix: String,
  title: String,
  updated_at: Date,
  variants: [VariantSchema],
  vendor: String            
});

module.exports = mongoose.model('Product', ProductSchema, 'shopifyProducts');