import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ManageService } from "../../services/manage.service";
import { AccountSummary } from "../../model/AccountSummary";
import { ActivatedRoute, Router, Params } from '@angular/router'
import { UsageSummary } from "../../model/usageSummary";
import * as moment from 'moment/moment';
@Component({
    templateUrl: 'manage.component.html'
})
export class ManageComponent {
    constructor(private _manageService: ManageService, private _route: ActivatedRoute) {
        this.onClickCalendar('');
     }
    accountSummary: AccountSummary;
    usageSummary: UsageSummary;
    groups: any[]=[];
     
    ngOnInit(): void {
        
        
        this._manageService.getUsageSummary().subscribe(usageSummary => {
            this.usageSummary = usageSummary;
        });
        this._manageService.getAccountSummary()
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
            });
             
    }
    onClickCalendar(groupPath): void {
        
        var current= moment().format('YYYY-MM');
        var period =  groupPath || current;
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
}
