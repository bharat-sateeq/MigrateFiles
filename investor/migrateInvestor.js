import { investorData } from "../OldData/investorUsers.js";
// import { voucherData } from "voucherData.js"
import * as fs from "fs";
console.log(investorData.length);

const newData = [];
const testFunc = () => {
  investorData.forEach((item) => {
    // let voucherList = [];

    // voucherData.forEach((element) => {
    //   const x = element.investor.findIndex((id) => {
    //     return id === item._id.$oid;
    //   })
    //   if (x !== -1) {
    //     voucherList.push(element._id.$oid);
    //   }
    // })

    newData.push({
      _id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      domain: item.email?.split('@')[1],
      mobile: {
        countryCode: "+91",
        phone: item.phoneNumber,
      },
      avatar: item.profileImage,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      kyc: false,
      emailVerified: false,
      mobileVerified: false,
      googleId: "",
      linkedinId: "",
      isVerified: false,
      mailConsent: false,
      whatsAppConsent: false,
      platformFairUseConsent: true,
      favouriteCategories: item.favouritStartupCategories,
      referralCode: "",
      joinedByReferral: [],
      investedByReferral: [],
      kycDetails: {
        name: "",
        fathersName: "",
        ageBand: "",
        state: "",
        gender: "",
        pan: {
          number: "",
          isVerified: false,
        },
        aadhaar: {
          number: "",
          isVerified: "",
        },
      },
      verificationProofs: {
        passport: "",
        aadhaar: "",
        panCard: "",
        idProof: "",
        proofOfResidency: "",
        updatedAt: "",
      },
      vouchers: [],
      bankMerchantName: "",
      occupation: "",
      bankName: "",
      bankPhoneNumber: "",
      branchName: "",
      address: "",
      city: "",
    });
  });
}
testFunc();
// console.log(newData);
fs.writeFile("./newMigrate/NewData/investorData.json", JSON.stringify(newData), function (err) {
  if (err) {
    console.error("Error while migrating data", err);
  }
});

// {
//   firstName: { type: String },
//   lastName: { type: String },
//   email: { type: String },
//   domain: { type: String },
//   mobile: {
//     countryCode: { type: String },
//     phone: { type: Number },
//   },
//   avatar: { type: String },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   updatedAt: {
//     type: Date,
//   },
//   kyc: {
//     type: Boolean,
//     default: false,
//   },
//   emailVerified: {
//     type: Boolean,
//     default: false,
//   },
//   mobileVerified: {
//     type: Boolean,
//     default: false,
//   },
//   googleId: { type: String },
//   linkedinId: { type: String },
//   isVerified: {
//     type: Boolean,
//     default: false, // true means user has verified both email & phone
//   },
//   mailConsent: {
//     type: Boolean,
//     default: false, // true means user has subscribed to platform & product update mails
//   },
//   whatsAppConsent: {
//     type: Boolean,
//     default: false, // true means user has subscribed to platform & product update WhatsApp Messages
//   },
//   platformFairUseConsent: {
//     type: Boolean,
//     default: false, // true means user has agreed to all rules of fair use of this platform
//   },
//   favouriteCategories: [
//     {
//       type: String,
//     },
//   ],
//   referralCode: {
//     type: String,
//   },
//   joinedByReferral: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Investor",
//     },
//   ],
//   investedByReferral: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Investor",
//     },
//   ],
//   kycDetails: {
//     name: String,
//     fathersName: String,
//     ageBand: String,
//     state: String,
//     gender: String,
//     pan: {
//       number: { type: String, unique: true, sparse: true },
//       isVerified: Boolean,
//     },
//     aadhaar: {
//       number: { type: String, unique: true, sparse: true },
//       isVerified: Boolean,
//     },
//   },
//   verificationProofs: {
//     passport: String,
//     aadhaar: String,
//     panCard: String,
//     idProof: String,
//     proofOfResidency: String,
//     updatedAt: Date,
//   },
//   vouchers: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Voucher",
//     },
//   ],
//   bankMerchantName: String,
//   occupation: String,
//   bankName: String,
//   bankPhoneNumber: String,
//   branchName: String,
//   address: String,
//   city: String,
// }