import { IBudget } from "../model/IBudget";

export class Group {
    groupId: number;
    groupName : string;
    type : string;
    projected : number;
    actual : number;
    budgets : IBudget[]
}