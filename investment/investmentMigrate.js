import { investorData } from "../OldData/investorUsers.js";
import { TransactionData } from "../OldData/transactions.js";
import * as fs from "fs";
console.log(investorData.length);

const newData = [];
const testFunc = () => {
    // Investor Loop
    investorData.forEach((item) => {
        // Transaction Loop
        item.transactionRefs.forEach((transactionItem) => {
            // Find Transaction Object by ID
            let transObj = TransactionData.find((object => {
                if (object._id.$oid = transactionItem.$oid ) {
                    if(object.orderDetails.status ==="Success"){
                        return object;
                    }else{
                        return {fail:true};
                    }
                }
            }));

            if(transObj.fail){
                return;
            }
            // ager new data array ka campaign & investor current obj ke campaign & investor ke same hai to --
            // then insert into jo object hume mila tha new Data array ke transactions array me

            // if esign details are present then update it (kyuki bs ek hoti hai)
            // also change createdAt & updatedAt lasted date

            let index=newData.findIndex((object)=>{
                return JSON.stringify(object.campaign) === JSON.stringify(transObj.campaign) && JSON.stringify(object.investor) ===JSON.stringify(transObj.investor);
            });

            if(index === -1){
                // E Sign Is True
                if(transObj.e_signed){
                    let newObj = {
                        agreement: "",
                        transactions: [transactionItem],
                        startup: transObj.startUpUserRef,
                        campaign: transObj.campaignId,
                        investor: transObj.investorUserRef,
                        eSign: {
                            eSignUrl:transObj.e_sign_url,
                            generatedClientID:transObj.generated_client_id,
                            eSigned: transObj.e_signed,
                        },
                        createdAt: transObj.createdAt,
                        updatedAt:transObj.createdAt,
                    };
                    newData.push(newObj);
                }
            }else{
                // Push Transaction
                newData[index].transactions.push(transactionItem);
                // Update Esign
                let old_eSign=newData[index].eSign;
                newData[index].eSign={
                    eSignUrl:old_eSign.eSignUrl ?? transObj.e_sign_url,
                    generatedClientID:old_eSign.generatedClientID ?? transObj.generated_client_id,
                    eSigned:old_eSign.eSigned ?? transObj.e_signed,
                };

                // Update Created At & UpdatedAt
                let oldDate=newData[index].eSign.createdAt;

                newData[index].createdAt= oldDate.$date > transObj.createdAt.$date ? oldDate :transObj.createdAt
                newData[index].updatedAt= oldDate.$date > transObj.createdAt.$date ? oldDate :transObj.createdAt;
                 
            }

            // Push Data
        });
    });
}

// check if combination of investorId & campaignId is present in new Data if yes then add that transactionId in transaction array of that object else create new object with the data and push it into new Data array


testFunc();
// console.log(newData);
fs.writeFile("./newMigrate/NewData/investmentData.json", JSON.stringify(newData), function (err) {
    if (err) {
        console.error("Error while migrating data", err);
    }
    console.log("Done");
});
// let tempObj = {
//     agreement: "",
//     transactions: item.transactionRefs,
//     startup: transObj.startUpUserRef,
//     campaign: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Campaign",
//     },
//     investor: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Investor",
//     },
//     eSign: {
//         eSignUrl: {
//             type: String,
//         },
//         generatedClientID: {
//             type: String,
//         },
//         eSigned: {
//             type: Boolean,
//             default: false,
//         },
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now(),
//     },
//     updatedAt: {
//         type: Date,
//     },
// };

// agreement: {type: String,},
//   transactions: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Transaction",
//     },
//   ],
//   startup: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Startup",
//   },
//   campaign: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Campaign",
//   },
//   investor: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Investor",
//   },
//   eSign: {
//     eSignUrl: {
//       type: String,
//     },
//     generatedClientID: {
//       type: String,
//     },
//     eSigned: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   updatedAt: {
//     type: Date,
//   },