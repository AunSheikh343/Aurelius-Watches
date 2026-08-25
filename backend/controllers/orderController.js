const Order = require("../models/Order");

const orderIdPattern = /^AW-[A-Z0-9]{5,}$/i;

const formatOrder = order => ({
  orderId: order.orderId,
  customerName: order.customerName,
  orderDate: order.createdAt,
  totalAmount: order.totalAmount,
  paymentStatus: order.paymentStatus,
  status: order.status,
  trackingNumber: order.trackingNumber,
  estimatedDelivery: order.estimatedDelivery,
  shippingAddress: order.shippingAddress,
});

const createOrder = async (req, res) => {
  const { customerName, products, totalAmount, shippingAddress } = req.body || {};

  if (!customerName || !Array.isArray(products) || !products.length || !shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.postalCode) {
    return res.status(400).json({ success: false, message: "Complete delivery information is required." });
  }

  const order = await Order.create({
    orderId: `AW-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    user: req.user.id,
    customerName: String(customerName).trim(),
    products,
    totalAmount: Number(totalAmount),
    paymentStatus: "Paid",
    status: "Order Placed",
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    shippingAddress: {
      address: String(shippingAddress.address).trim(),
      city: String(shippingAddress.city).trim(),
      postalCode: String(shippingAddress.postalCode).trim(),
      country: String(shippingAddress.country || "Pakistan").trim(),
    },
  });

  res.status(201).json({ success: true, order: formatOrder(order) });
};

const trackOrder = async (req, res) => {
  const orderId = String(req.params.orderId || "").trim();
  if (!orderIdPattern.test(orderId)) return res.status(400).json({ success: false, message: "Please enter a valid Order ID." });

  const order = await Order.findOne({ orderId: orderId.toUpperCase(), user: req.user.id }).select("-__v -products").lean();
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  res.json({ success: true, order: formatOrder(order) });
};

module.exports = { createOrder, trackOrder };
