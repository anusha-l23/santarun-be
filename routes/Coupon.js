const express = require('express');
const router = express.Router();
const couponController = require("../controllers/CouponControllers");
// Routes
router.post('/requestcoupon', couponController.requestCoupon);
router.post('/freeregistration', couponController.freeRegistration);
router.post('/apply-coupon', couponController.applyCoupon);
module.exports = router;