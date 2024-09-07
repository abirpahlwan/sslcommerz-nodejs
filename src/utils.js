const { v4: uuidv4 } = require('uuid');

const web3 = require('web3');
// const web3 = new Web3();

// Function to generate a Web3-like transaction ID
const generateTransactionId = () => {
    return web3.utils.randomHex(32); // Generates a random 32-byte hex string
};

const getPaymentData = (payment) => ({
    total_amount: parseInt(payment.amount),
    currency: 'BDT',
    shipping_method: 'NO',
    tran_id: uuidv4(),
    // tran_id: generateTransactionId(),
    success_url: `${process.env.SERVER_API}/payment/success`,
    fail_url: `${process.env.SERVER_API}/payment/fail`,
    cancel_url: `${process.env.SERVER_API}/payment/cancel`,
    ipn_url: `${process.env.SERVER_API}/payment/notification`,
});

const getCustomerData = (customer) => ({
    cus_name: customer.name,
    cus_email: customer.email,
    cus_add1: customer.address1,
    cus_add2: customer.address2,
    cus_city: customer.city,
    cus_state: customer.state,
    cus_postcode: customer.postcode,
    cus_country: customer.country,
    cus_phone: customer.phone,
    cus_fax: customer.fax,
});

const getProductData = (product) => ({
    product_name: product.name,
    product_category: product.category,
    product_profile: product.profile,
});

module.exports = { getPaymentData, getCustomerData, getProductData};