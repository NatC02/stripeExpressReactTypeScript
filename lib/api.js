"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
const checkout_1 = require("./checkout");
exports.app.use(express_1.default.json());
const cors_1 = __importDefault(require("cors"));
exports.app.use(cors_1.default({ origin: true }));
//Testing the first endoint with postman
exports.app.post('/test', (req, res) => {
    const amount = req.body.amount;
    res.status(200).send({ with_tax: amount * 7 });
});
// Creation of Checkouts Session
exports.app.post('/checkouts/', runAsync(async ({ body }, res) => {
    res.send(await checkout_1.createStripeCheckoutSession(body.line_items));
}));
//Catch errors with async when awaiting for responses
function runAsync(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
}
//# sourceMappingURL=api.js.map