import mongoose from "mongoose";
import { Schema, model, SchemaTypes } from 'mongoose';

interface ITransaction {
    from:String,
    to:String,
    txhash:String
    
}


const transactionSchema=new Schema<ITransaction>({
    from:{ type: String, required: true },
    to:{ type: String, required: true },
    txhash:{ type: String, required: true }
    // timestamp:{type:Number,required: true},
},
{ timestamps: true }
);

// const transactiondetails= mongoose.model('Transaction') || mongoose.model('Transaction',transactionSchema);
// const transactSchema =  mongoose.model('Transaction') || model<ITransaction>('Transactions', transactionSchema);
const transactSchema = mongoose.models.Transactions || model<ITransaction>('Transactions', transactionSchema);


export default transactSchema;
