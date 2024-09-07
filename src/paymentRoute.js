const router = require("express").Router();

const { initializePayment, makePayment, paymentSuccessful, validatePayment, paymentFailed, paymentCancelled, notificationFromSSLCommerz } = require("./paymentController");

// Routes
router.post('/initialize', initializePayment);
router.post('/paynow', makePayment);
router.post('/success', paymentSuccessful);
router.get ('/validate', validatePayment);
router.post('/fail', paymentFailed);
router.post('/cancel', paymentCancelled);
router.post('/notification', notificationFromSSLCommerz);

// TODO
// router.post('/refund', initiateRefund);
// router.post('/status', transactionQuery);

module.exports = router;