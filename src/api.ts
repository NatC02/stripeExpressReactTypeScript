import express, {Request, Response} from "express";
export const app = express();

import { createStripeCheckoutSession } from './checkout';
import { createPaymentIntent } from './payments';

app.use(express.json())

import cors from 'cors';
import { NextFunction } from "express-serve-static-core";

app.use(cors({origin: true}));

//Testing the first endoint with postman

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