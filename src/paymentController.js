const assert = require('assert');
const winston = require('winston');
const { combine, timestamp, json } = winston.format;
const SSLCommerzPayment = require('sslcommerz-lts');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { getPaymentData, getCustomerData, getProductData } = require('./utils');

const logger = winston.createLogger({
	// format: winston.format.cli(),
	format: combine(timestamp(), json()),
	transports: [new winston.transports.Console()],
});

const initializePayment = async (req, res, next) => {
    const { payment, customer, product } = req.body;

    const paymentData = getPaymentData(payment);
    const customerData = getCustomerData(customer);
    const productData = getProductData(product);

    const params = {
        storeID: process.env.SSLC_STORE_ID,
        storePassword: process.env.SSLC_STORE_PASSWORD,
        productionMode: process.env.ENVIRONMENT === 'production',
    }

    const data = {
        ...paymentData,
        ...customerData,
        ...productData,
    };

    // TODO: metadata

    const sslcz = new SSLCommerzPayment(params.storeID, params.storePassword, params.productionMode);
    sslcz.init(data).then(response => {
        assert.equal(response.status, 'SUCCESS');

        // Get the payment gateway URL
        let GatewayPageURL = response.GatewayPageURL;

        // Insert order details into the database
        // const order = { ...planDetails, tran_id, status: 'pending'};
        // const result = ordersCollection.insertOne(order);

        // Redirect the user to payment gateway
        // res.redirect(GatewayPageURL)

		// Send the payment gateway URL to the client
        res.send({ url: GatewayPageURL });
    }).catch(error => {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    });
}

const makePayment = async (req, res, next) => {
  
}

const paymentSuccessful = async (req, res, next) => {
	return res.status(200).json(
		{
		  data: req.body,
		  message: 'Payment success'
		}
	  );
}

const validatePayment = async (req, res, next) => {

}

const paymentFailed = async (req, res, next) => {

}

const paymentCancelled = async (req, res, next) => {

}

const notificationFromSSLCommerz = async (req, res, next) => {

}

module.exports = {initializePayment, makePayment, paymentSuccessful, validatePayment, paymentFailed, paymentCancelled, notificationFromSSLCommerz };