
import { IBudget } from "./IBudget";

export class Transaction {
    _id : number;
    transactionName : string;
    transactionAmount : string;
    transactionRemark : string;
    transactionOn : string;
    createdAt: string;
    UName : string
    budget : IBudget;
}