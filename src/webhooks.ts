import { stripe } from './';
import Stripe from 'stripe';

const webhookHandlers = {
    'checkout.session.completed': async (data: Stripe.Event.Data) => {
      // Add your business logic here
    },
    'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
      // Add your business logic here
    },
    'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
      // Add your business logic here
    }
}


//Validate the stripe webhook secret, then call the handler for the event type

 export const handleStripeWebhook = async(req, res) => {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET); // This validates it
    
    try {
      await webhookHandlers[event.type](event.data.object);
      res.send({received: true});
    } catch (err) {
      console.error(err)
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }