import { Component, OnInit } from '@angular/core';
import { TransactionService } from "app/services/TransactionService";
import { EntityChartData } from "app/model/EntityChartData";
import { CategoryService } from "app/services/category.service";
import { BudgetService } from "app/services/budget.service";
import * as moment from 'moment/moment';
@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    monthlyBudgetsChartData: EntityChartData;
    isMonthlyBudgetsDataAvailable: boolean = false;
    categoriesChartData: EntityChartData;
    isCategoriesDataAvailable: boolean = false;
    transactionsChartData: EntityChartData;
    transactionsChartDataArray: any[] =[];
    isTransactionsDataAvailable: boolean = false;
    monthlyPeriod: string[] = [];
    year: string = moment().format('YYYY');
    month: string = moment().format('MM');
    selectedMonth: string;
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'right' },
        elements: {
            line: {
                tension: 0.3, // disables bezier curves
            },
        }
    };
    colours = [{
        backgroundColor: 'transparent',
    }]
    constructor(private _transactionService: TransactionService, private _categoryService: CategoryService, private _budgetService: BudgetService) { }
    reload(period): void {
        var date = period.split('-')
        this.year = date[0];
        this.month = date[1];
        this.loadChartsData();
    }
    prepareMonthPeriod(): void {
        for (var i = 0; i < 6; i++) {
            let date = moment().subtract(i, 'months').format('YYYY-MM')
            this.monthlyPeriod.push(date);
        }
    }
    loadChartsData(): void {
        this._transactionService.getTransactionsChartData(this.year, this.month)
            .subscribe(transactionsChartData => {
                this.isTransactionsDataAvailable = true;
                this.transactionsChartData = transactionsChartData;
                while(this.transactionsChartDataArray.length > 0) {
                    this.transactionsChartDataArray.pop();
                }
                this.transactionsChartDataArray.push(transactionsChartData)
            });
        this._categoryService.getCategoriesChartData(this.year, this.month)
            .subscribe(categoriesChartData => {
                this.isCategoriesDataAvailable = true;
                this.categoriesChartData = categoriesChartData;
            });
        this._budgetService.getBudgetMonthlyChart()
            .subscribe(monthlyBudgetsChartData => {
                this.isMonthlyBudgetsDataAvailable = true;
                this.monthlyBudgetsChartData = monthlyBudgetsChartData;
            })
    }
    ngOnInit(): void {
        this.prepareMonthPeriod();
        this.loadChartsData();
    }

}
