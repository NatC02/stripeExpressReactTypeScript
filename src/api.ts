import express, {Request, Response} from "express";
export const app = express();

import { createStripeCheckoutSession } from './checkout';

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
  
  //Catch errors with async when awaiting for responses

  function runAsync(callback: Function){
      return (req: Request, res: Response, next: NextFunction) => {
          callback (req, res, next).catch(next);
      }
  }