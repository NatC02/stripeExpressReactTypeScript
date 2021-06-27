"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntentAndCharge = exports.createPaymentIntent = void 0;
const _1 = require(".");
// Creating a Payment Intent with a specific amount
async function createPaymentIntent(amount) {
    const paymentIntent = await _1.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
    });
    return paymentIntent;
}
exports.createPaymentIntent = createPaymentIntent;
/**
    Creating a Payment Intent and try to charge right away,
    must have an existing customer with a saved card payment method on file.
 */
async function createPaymentIntentAndCharge(amount, customer, payment_method) {
    const paymentIntent = await _1.stripe.paymentIntents.create({
        amount,
        customer,
        payment_method,
        currency: 'usd',
        off_session: true,
        confirm: true,
    });
    return paymentIntent;
}
exports.createPaymentIntentAndCharge = createPaymentIntentAndCharge;
//# sourceMappingURL=payments.js.map