
import { IBudget } from "./IBudget";

export class Transaction {
    transactionId : number;
    transactionAmount : string;
    transactionRemark : string;
    transactionOn : string;
    createdAt: string;
    budget : IBudget;
}