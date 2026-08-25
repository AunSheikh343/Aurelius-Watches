const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true, trim: true },
    products: [
      {
        productId: Number,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Paid" },
    status: {
      type: String,
      enum: ["Order Placed", "Order Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Order Placed",
    },
    trackingNumber: { type: String, trim: true },
    estimatedDelivery: Date,
    shippingAddress: {
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true, default: "Pakistan" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
