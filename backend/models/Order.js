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
const MoneySetSchema = new mongoose.Schema({
  shop_money: {
    amount: String,
    currency_code: String
  },
  presentment_money: {
    amount: String,
    currency_code: String
  }
});

const LineItemSchema = new mongoose.Schema({
  id: Number,
  variant_id: Number,
  title: String,
  quantity: Number,
  sku: String,
  variant_title: String,
  vendor: String,
  fulfillment_service: String,
  product_id: Number,
  requires_shipping: Boolean,
  taxable: Boolean,
  gift_card: Boolean,
  name: String,
  variant_inventory_management: String,
  properties: [Object],
  product_exists: Boolean,
  fulfillable_quantity: Number,
  grams: Number,
  price: Number,
  total_discount: String,
  fulfillment_status: String,
  price_set: MoneySetSchema,
  total_discount_set: MoneySetSchema,
  discount_allocations: [Object],
  duties: [Object],
  admin_graphql_api_id: String
});

const OrderSchema = new mongoose.Schema({
  _id: Number,
  id: Number,
  email: String,
  closed_at: Date,
  created_at: Date,
  updated_at: Date,
  number: Number,
  note: String,
  token: String,
  gateway: String,
  test: Boolean,
  total_price: String,
  subtotal_price: String,
  total_weight: Number,
  total_tax: String,
  taxes_included: Boolean,
  currency: String,
  financial_status: String,
  confirmed: Boolean,
  total_discounts: String,
  total_line_items_price: String,
  buyer_accepts_marketing: Boolean,
  name: String,
  referring_site: String,
  landing_site: String,
  cancelled_at: Date,
  cancel_reason: String,
  total_price_usd: String,
  checkout_token: String,
  reference: String,
  user_id: Number,
  location_id: Number,
  source_identifier: String,
  source_url: String,
  processed_at: Date,
  device_id: Number,
  phone: String,
  customer_locale: String,
  app_id: Number,
  browser_ip: String,
  landing_site_ref: String,
  order_number: Number,
  discount_applications: [Object],
  discount_codes: [Object],
  note_attributes: [Object],
  payment_gateway_names: [String],
  processing_method: String,
  checkout_id: Number,
  source_name: String,
  fulfillment_status: String,
  tax_lines: [Object],
  tags: String,
  contact_email: String,
  order_status_url: String,
  presentment_currency: String,
  total_line_items_price_set: MoneySetSchema,
  total_discounts_set: MoneySetSchema,
  total_shipping_price_set: MoneySetSchema,
  subtotal_price_set: MoneySetSchema,
  total_price_set: MoneySetSchema,
  total_tax_set: MoneySetSchema,
  line_items: [LineItemSchema],
  fulfillments: [Object],
  refunds: [Object],
  total_tip_received: String,
  original_total_duties_set: Object,
  current_total_duties_set: Object,
  admin_graphql_api_id: String,
  shipping_lines: [Object],
  billing_address: Object,
  shipping_address: Object,
  client_details: Object,
  customer: {
    id: Number,
    email: String,
    created_at: Date,
    updated_at: Date,
    first_name: String,
    last_name: String,
    orders_count: Number,
    state: String,
    total_spent: String,
    last_order_id: Number,
    note: String,
    verified_email: Boolean,
    multipass_identifier: String,
    tax_exempt: Boolean,
    phone: String,
    tags: String,
    last_order_name: String,
    currency: String,
    marketing_opt_in_level: String,
    tax_exemptions: [String],
    admin_graphql_api_id: String,
    default_address: AddressSchema
  }
});

module.exports = mongoose.model('Order', OrderSchema, 'shopifyOrders');