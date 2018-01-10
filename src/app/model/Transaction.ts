
import { IBudget } from "./IBudget";

export class Transaction {
    _id : number;
    transactionName : string;
    transactionAmount : string;
    transactionRemark : string;
    transactionOn : string;
    createdAt: string;
    budget : IBudget;
}