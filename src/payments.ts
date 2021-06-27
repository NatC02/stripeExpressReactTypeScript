import { stripe } from '.';

// Creating a Payment Intent with a specific amount

export async function createPaymentIntent(amount: number) {

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        // receipt_email: 'hello@example.com',
    });

    return paymentIntent;
}

/**
    Creating a Payment Intent and try to charge right away,
    must have an existing customer with a saved card payment method on file. 
 */

export async function createPaymentIntentAndCharge(amount: number, customer: string, payment_method: string) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    customer,
    payment_method,
    currency: 'usd',
    off_session: true,
    confirm: true,
  });

  return paymentIntent;

}