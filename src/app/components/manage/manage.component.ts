import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ManageService } from "../../services/manage.service";
import { AccountSummary } from "../../model/AccountSummary";
import { ActivatedRoute, Router, Params } from '@angular/router'
import { UsageSummary } from "../../model/usageSummary";
import * as moment from 'moment/moment';
import { AddTransactionComponent } from './add.transaction.dialog.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Transaction } from "app/model/Transaction";
import { IBudget } from "app/model/IBudget";
import { ViewTransactionComponent } from "app/components/manage/view.transaction.dialog.component";
import { EditBudgetComponent } from "app/components/manage/edit.budget.dialog.component";
@Component({
    templateUrl: 'manage.component.html'
})
export class ManageComponent {
    constructor(private _manageService: ManageService, private _route: ActivatedRoute,private dialogService:DialogService) {        
        this.onClickCalendar('');
     }
    accountSummary: AccountSummary;
    usageSummary: UsageSummary = new UsageSummary();
    groups: any[]=[];
     
    ngOnInit(): void {
        
    }
    onClickCalendar(groupPath): void {
        var current= moment().format('YYYY-MM');
        var period =  groupPath || current;
        this.getAccountSummary('mmadel',period);
        var year = period.split("-")[0];
        var month =period.split("-")[1];
        var groups: any[]=[];
        for(var i = -1; i < 2; i++) {
            var now = moment(period, "YYYY-MM").toDate();
            var date = now.setMonth(now.getMonth() + i);
            var path = moment(date).format("YYYY-MM");
            groups.push({
              date: date,
              display: moment(date).format("MMM YYYY"),
              path: path,
              active: path == period,
              current: path == current
            });
          }
          this.groups = groups;
    }
    addTransactionDialog(budget :IBudget) :void{
        let disposable = this.dialogService.addDialog(AddTransactionComponent, {
            title:'Confirm title', 
            message:'Confirm message', selectedBudget : budget})
            .subscribe((result)=>{
                if(result !== undefined){
                    let transaction =<Transaction> result;
                    transaction.budget = budget;
                }      
                var period = moment().format('YYYY-MM');
                this.getAccountSummary('mmadel',period)            
            });
    }
    viewTransactionDialog(budget :IBudget) :void{
        let disposable = this.dialogService.addDialog(ViewTransactionComponent, {
            title:'titel', 
            message:'Confirm message',
            selectedBudget : budget})
            .subscribe((result)=>{ 
                var period = moment().format('YYYY-MM');  
                this.getAccountSummary('mmadel',period)        
            });
    }
    editBudgetDialog(budget :IBudget) :void{
        let disposable = this.dialogService.addDialog(EditBudgetComponent, {
            title:'titel', 
            message:'Confirm message',
            selectedBudget : budget})
            .subscribe((result)=>{   
                var period = moment().format('YYYY-MM');
                this.getAccountSummary('mmadel',period)     
            });
    }
    getAccountSummary(username, period){
        
        this._manageService.getAccountSummary(username, period)
        .subscribe(accountSummary => {
            var totalIncome = 0.0;
            var totalActual = 0.0;
            var totalProjected = 0.0;
            
            accountSummary.groups.forEach((group, index) => {
                var projected = 0.0;
                var actual = 0.0;
                group.budgets.forEach((budget, index) => {
                    if (group.type == 'INCOME') {
                        // total actual income
                        totalIncome += budget.actual;
                    } else {
                        // total spending budget
                        totalProjected += budget.projected;
                        // total actual spending
                        totalActual += budget.actual;
                    }
                    projected += budget.projected;
                    actual += budget.actual;
                });
                group.projected = projected;
                group.actual = actual;
                
            });
            this.accountSummary = accountSummary;
            this.usageSummary.income = totalIncome;
            this.usageSummary.projected = totalProjected;
            this.usageSummary.actual = totalActual;
            this.usageSummary.remaining = totalProjected - totalActual;
        });
    }
}

    