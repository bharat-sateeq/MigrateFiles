import { TransactionData } from "../OldData/transactions.js";
import { paymentLinkData } from "../OldData/paymentLink.js";
import { investmentData } from '../OldData/investment.js';
import * as fs from "fs";
console.log(TransactionData.length);
const newData = [];
const testFunc = () => {

    TransactionData.forEach((item) => {
        let orderId;
        let newEntity;
        paymentLinkData.forEach((object) => {
            if (object._id.$oid === item.paymentRef?.$oid) {
                orderId = object.order_id;
                newEntity = object.entity;
                return;
            }
        })

        let investmentId;
        investmentData.forEach((object) => {
            let index = object.transactions.findIndex((temp) => {
                return temp.$oid === item._id.$oid;
            })
            if (index !== -1) {
                investmentId = object._id;
                return;
            }
        })
        newData.push({
            _id: item._id,
            receipt: item._id.$oid + "_v1",
            isCaptured: item.is_captured,
            campaign: item.campaignId.ref,
            investor: item.investorUserRef.ref,
            startup: item.startUpUserRef,
            status: item.payment_status,
            refunded: false,
            paidAmount: item.payment_amount,
            discountAmount: Math.trunc(item.payment_amount - item.amountInvested) || 0,
            gst: item.GST,
            tds: item.TDS,
            platformFees: item.SateeqFee,
            investedAmount: item.amountInvested,
            orderId: item.orderDetails.orderId,
            currency: item.payment_currency,
            bank: item.bank_reference,
            method: item.payment_method,
            international: false,
            entity:newEntity,
            createdAt: item.createdAt,
            voucher: item.promocode,
            investment: investmentId,
            order: orderId,

        });
    });
}
testFunc();
// console.log(newData);
fs.writeFile("./newMigrate/NewData/transactionData.json", JSON.stringify(newData), function (err) {
    if (err) {
        console.error("Error while migrating data", err);
    }
    console.log("Completed");
});


// {
//     receipt: {
//       type: String,
//     },
//     isCaptured: {
//       type: Boolean,
//       default: false,
//     },
//     investment: { type: mongoose.Schema.ObjectId, ref: "Investment" },
//     order: { type: mongoose.Schema.ObjectId, ref: "Order" },
//     campaign: {
//       type: mongoose.Schema.ObjectId(),
//       ref: "Campaign",
//     },
//     investor: {
//       type: mongoose.Schema.ObjectId(),
//       ref: "Investor",
//     },
//     startup: {
//       type: mongoose.Schema.ObjectId(),
//       ref: "Startup",
//     },
//     voucher: { type: mongoose.Schema.ObjectId, ref: "Voucher" },
//     status: {
//       type: String,
//     },
//     refunded: {
//       type: Boolean,
//       default: false,
//     },
//     paidAmount: {
//       type: Number,
//     },
//     discountAmount: {
//       type: Number,
//       default: 0,
//     },
//     gst: {
//       type: Number,
//     },
//     tds: {
//       type: Number,
//     },
//     platformFees: {
//       type: Number,
//     },
//     investedAmount: {
//       type: Number,
//     },
//     acquirerData: {
//       type: Map,
//     },
//     vpa: {
//       type: String,
//     },
//     description: {
//       type: String,
//     },
//     orderId: {
//       type: String,
//     },
//     currency: {
//       type: String,
//     },
//     wallet: {
//       type: String,
//     },
//     bank: {
//       type: String,
//     },
//     method: {
//       type: String,
//     },
//     international: {
//       type: Boolean,
//       default: false,
//     },
//     invoiceId: {
//       type: String,
//     },
//     cardId: {
//       type: String,
//     },
//     entity: {
//       type: Map,
//     },
//     invoice: {
//       type: String,
//     },
//     notes: {
//       type: Map,
//     },
//     createdAt: { type: Date, default: Date.now() },
//     updatedAt: { type: Date },
//   }