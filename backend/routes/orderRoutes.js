const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { createOrder, trackOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", requireAuth, createOrder);
router.get("/track/:orderId", trackOrder);

module.exports = router;
