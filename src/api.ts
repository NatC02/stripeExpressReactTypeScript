import express, {Request, Response} from "express";
export const app = express();

import { createStripeCheckoutSession } from './checkout';
import { createPaymentIntent } from './payments';

import { auth } from './firebase';

app.use(express.json())

import cors from 'cors';
import { NextFunction } from "express-serve-static-core";
import { handleStripeWebhook } from "./webhooks";

// Middleware //


//allows cross origin requests

app.use(cors({origin: true}));

// Sets rawBody for webhook handling

app.use(
    express.json({
      verify: (req, res, buffer) => (req['rawBody'] = buffer), // works for any endpoint
    })
  );


  // Decodes the Firebase JSON Web Token
app.use(decodeJWT);

/**
 * Decodes the JSON Web Token sent via the frontend app
 * Makes the currentUser (firebase) data available on the body.
 */
async function decodeJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

//Helper (the one below is used to validate user or otherwise throw an error)

function validateUser(req: Request) {
  const user = req['currentUser'];
  if (!user) {
    throw new Error(
      'You must be logged in to make this request. i.e Authroization: Bearer <token>'
    );
  }

  return user;
}
  
//Webhooks

//Handle webhooks
app.post('/hooks', runAsync(handleStripeWebhook));

//Testing the first endpoint with postman

app.post('/test', (req: Request, res: Response) => {

    const amount = req.body.amount;

    res.status(200).send({ with_tax: amount * 7});

});

// Creation of Checkouts Session

app.post(
    '/checkouts/',
    runAsync(async ({ body }: Request, res: Response) => {
            res.send(await createStripeCheckoutSession(body.line_items));
        })
    );


// Payment Intents API

// Create a PaymentIntent
app.post(
    '/payments',
    runAsync(async ({ body }: Request, res: Response) => {
      res.send(await createPaymentIntent(body.amount));
    })
  );

  //Catch errors with async when awaiting for responses

    function runAsync(callback: Function){
        return (req: Request, res: Response, next: NextFunction) => {
            callback (req, res, next).catch(next);
        }
    }
