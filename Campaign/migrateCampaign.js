import { campaignData } from "../OldData/campaigns.js";
import { TransactionData } from '../OldData/transactions.js';
import { investorData } from '../OldData/investorUsers.js';
import * as fs from "fs";
console.log(campaignData.length);

const newData = [];
const testFunc = () => {
    campaignData.forEach((item) => {
        let newTag;
        if (item.isActive) {
            newTag = "ongoing";
        } else if (item.isApproved) {
            newTag = "upcoming";
        } else if (item.isCompleted) {
            newTag = "close";
        }

        let newDraft = "draft";
        if (item.isReview) {
            newDraft = "review";
        } else if (item.isApproved) {
            newDraft = "approved";
        } else if (item.isRejected) {
            newDraft = "rejected";
        }

        // Fix this

        let newInvestors = [];
        TransactionData.forEach((element) => {
            if (element.campaignId.ref.$oid === item._id.$oid && element.orderDetails.status === "Success") {
                let name = "";
                let avatar = "";
                investorData.forEach((investorItem) => {
                    if (investorItem._id.$oid === element.investorUserRef.ref.$oid) {
                        name = investorItem.firstName + " " + investorItem.lastName;
                        avatar = investorItem.profileImage;
                    }
                })
                newInvestors.push({ _id: element.investorUserRef.ref, name, avatar });
            }
        })
        newData.push({
            _id: item._id,
            name: item.displayName,
            avatar: item.StartUpNewCampaignBody.CompanyInfo.fundraiserBannerImage,
            categories: item.StartUpNewCampaignBody.CompanyInfo.sector,
            type: item.fundRaiseType || "Public",
            tag: newTag,//upcoming = isActive=false,isApprove=true & ongoing =isActive=true, & close =isActive =false , isCompleted=true
            status: newDraft,
            minInvestment: item.minInvestment || 0,
            percentRaised: item.totalTarget ? (item.totalraised * 100) / item.totalTarget : 0,//totalRaised*100/totalTarget
            dateOfSubmission: item.dateOfSubmission,
            campaignEndDate: item.adminEditCampaignBaseObject?.campaignEndDate,
            valuation: item.adminEditCampaignBaseObject?.valuation || 0,
            discount: item.adminEditCampaignBaseObject?.discount || 0,
            incrementalDiscount: item.adminEditCampaignBaseObject?.incrementalDiscount || 0,
            interestRate: item.adminEditCampaignBaseObject?.interestRate || 0,
            interestRepayment: item.adminEditCampaignBaseObject?.interestRepayment || 0,
            preTaxReturn: item.adminEditCampaignBaseObject?.preTaxReturn || 0,
            principalRepayment: item.adminEditCampaignBaseObject?.principalRepayment || 0,
            diligenceReport: item.adminEditCampaignBaseObject?.DiligenceReport,
            typeOfIssue: item.adminEditCampaignBaseObject?.typeOfInstrument,
            typeOfInstrument: item.adminEditCampaignBaseObject?.typeOfInstrument,
            targetAmount: item.totalTarget || 0,
            SuccessfulTransactionRefs: item.SuccessfultransactionRefs,
            transactionRefs: item.transactionRefs,
            investors: newInvestors,
            startup: item.createdBy,
            isSuccessful: item.isSuccessful || false,
            isActive: item.isActive || false,
            multiplier: [],
            quarterlyReports: [],
            description: item.StartUpNewCampaignBody.CompanyInfo.bio,
            motto: "",
            eSignPosition: [],
            accessRequested: [],
            accessApproved: [],
            accessRejected: [],
            accessSuspended: [], // approved then rejected
            priority: item.order,
            eSignAvailable: false,
        });
    });
}
testFunc();
// console.log(newData);
fs.writeFile("./newMigrate/NewData/campaignData.json", JSON.stringify(newData), function (err) {
    if (err) {
        console.error("Error while migrating data", err);
    }
});

// name: { type: String },
//   avatar: {
//     type: String,
//   },
//   categories: [
//     {
//       type: String,
//       enum: [
//         "AR/VR",
//         "Artificial Intelligence",
//         "Crypto",
//         "Defi",
//         "E-commerce",
//         "Ed-Tech",
//         "E-Vehicle",
//         "Fintech",
//         "Food & Beverages",
//         "Fashion",
//         "Gaming",
//         "Healthcare",
//         "Logistics",
//         "Media",
//         "Sass",
//         "Web 3.0",
//         "Wellness",
//       ],
//     },
//   ],
//   type: {
//     type: String,
//     required: true,
//     enum: ["Private", "Public"],
//   },
//   tag: {
//     type: String,
//     enum: ["upcoming", "ongoing", "closed"],
//   },
//   status: {
//     type: String,
//     enum: ["draft", "review", "approved", "rejected"],
//     default: "draft",
//   },
//   minInvestment: { type: Number, default: 0 },
//   percentRaised: { type: Number, default: 0 },
//   dateOfSubmission: { type: Date, default: Date.now() },
//   campaignEndDate: { type: Date },
//   valuation: { type: Number, default: 0 },
//   discount: { type: Number, default: 0 },
//   incrementalDiscount: { type: Number, default: 0 },
//   interestRate: { type: Number, default: 0 },
//   interestRepayment: { type: Number, default: 0 },
//   preTaxReturn: { type: Number, default: 0 },
//   principalRepayment: { type: Number, default: 0 },
//   diligenceReport: { type: String },
//   typeOfIssue: { type: String },
//   typeOfInstrument: { type: String },
//   targetAmount: { type: Number, default: 0 },
//   SuccessfulTransactionRefs: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Transaction",
//   },
//   transactionRefs: { type: mongoose.Schema.ObjectId, ref: "Transaction" },
//   investors: [
//     {
//       id: { type: mongoose.Schema.ObjectId, ref: "Investor" },
//       avatar: String,
//       name: String,
//     },
//   ],
//   startup: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Startup",
//   },
//   isSuccessful: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: false },
//   multiplier: [
//     {
//       multiple: { type: Number, default: 0 },
//       month: { type: Number },
//       year: { type: Number },
//     },
//   ],
//   quarterlyReports: [
//     {
//       link: { type: String },
//       month: { type: Number },
//       year: { type: Number },
//     },
//   ],
//   description: { type: String },
//   motto: { type: String },
//   eSignPosition: [
//     {
//       pageNo: { type: Number },
//       x: { type: Number },
//       y: { type: Number },
//     },
//   ],
//   accessRequested: [{ type: mongoose.Schema.ObjectId, ref: "Investor" }],
//   accessApproved: [{ type: mongoose.Schema.ObjectId, ref: "Investor" }],
//   accessRejected: [{ type: mongoose.Schema.ObjectId, ref: "Investor" }],
//   accessSuspended: [{ type: mongoose.Schema.ObjectId, ref: "Investor" }], // approved then rejected
//   priority: { type: Number },
//   eSignAvailable: { type: Boolean, default: false },



//{"campaignId.ref":ObjectId('63319e07e70479fef8be498c'),"orderDetails.status":"Success"}
// {_id:ObjectId('62bdc1200b883e97bb242243')}