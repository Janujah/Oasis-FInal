const stripe = require('stripe')('sk_test_51PGywdBwqNocB2yIDwIrXJCSRsaFltLWePb85abFOSVo5wFVkfnGNwoZZyrcbUzV0oq7DqIb22Ap1EgJzzuknZ6G00mVlTOXaA');

// Controller function to fetch payment details from Stripe
exports.getPaymentsFromStripe = async (req, res) => {
    try {
        const payments = await stripe.charges.list({
            limit: 100, // Adjust the limit according to your needs
        });
        console.log('Fetched payments response:', payments); // Log the complete response

        if (payments && Array.isArray(payments.data)) {
            res.json(payments.data);
        } else {
            console.error('Fetched payments data is not an array:', payments);
            res.status(500).json({ error: 'Fetched payments data is not an array' });
        }
    } catch (error) {
        console.error('Failed to fetch payments:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
};