import { Component, OnInit } from '@angular/core';

import { EntityChartData } from "app/model/EntityChartData";
import { TransactionService } from "app/services/TransactionService";
import { ChartData } from "app/model/ChartData";
import { CategoryService } from "app/services/category.service";
import { BudgetService } from "app/services/budget.service";

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    transactionsChartData: EntityChartData;
    categoriesChartData: EntityChartData;
    monthlyBudgetsChartData: EntityChartData;
    isTransactionsDataAvailable: boolean = false;
    isCategoriesDataAvailable: boolean = false;
    isMonthlyBudgetsDataAvailable: boolean = false;
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {position: 'right'},
        elements: {
            line: {
                tension: 0.2, // disables bezier curves
            },
        }
    };
    colours = [{
        backgroundColor: 'transparent',
    }]
    
    constructor(private _transactionService: TransactionService,private _categoryService: CategoryService,private _budgetService:BudgetService) { }
    ngOnInit(): void {
        this._transactionService.getTransactionsChartData()
            .subscribe(transactionsChartData => {
                this.isTransactionsDataAvailable = true;
                console.log('@@@@@@@@@@@ ' + JSON.stringify(transactionsChartData));
                this.transactionsChartData = transactionsChartData;
            });
        this._categoryService.getCategoriesChartData()
        .subscribe(categoriesChartData=>{
            this.isCategoriesDataAvailable = true;
            this.categoriesChartData = categoriesChartData;
        });
        this._budgetService.getBudgetMonthlyChart()
        .subscribe(monthlyBudgetsChartData =>{
            this.isMonthlyBudgetsDataAvailable = true;
            this.monthlyBudgetsChartData=monthlyBudgetsChartData;
        })
    }
}
