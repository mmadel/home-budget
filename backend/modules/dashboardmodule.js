var moment = require('moment');
var _ = require('lodash');
var Financemodule = require('../modules/financemodule');
var Budgetmodule = require('../modules/budgetmodule');
var transactionsChartData = function (userName,year, month) {
    return new Promise((resolve, reject) => {
        var now = moment()

        var start = moment().year(year).month(month - 1).date(1).format('YYYY-MM-DD');
        var end = moment(start).endOf('month').format('YYYY-MM-DD');
        var days = new Array();
        if ((now.month() + 1) == month && now.year() == year) {
            end = now.format('YYYY-MM-DD');
        }
        var countOfDays = moment(end).diff(moment(start), 'days') + 1;

        for (var i = 0; i < countOfDays; i++) {
            var day = moment().year(year).month(month - 1).date(i + 1).format('MMM-DD');

            days.push({ 'day': day });
        }
        console.log('############# ' +userName);
        Financemodule.FindTransactionByRange(userName,start, end)
            .then(transactions => {
                var groups = _(transactions)
                    .groupBy('transactionOn')
                    .map(function (transactions, trxOn) {
                        return {
                            transactionOn: moment(trxOn).format('MMM-DD'),
                            transactions: _.sumBy(transactions, 'transactionAmount')
                        };
                    }).value();
                for (var i = 0; i < days.length; i++) {
                    let check = groups.find(o => o.transactionOn === days[i].day);
                    if (typeof check === 'undefined') {
                        groups.push({ "transactionOn": days[i].day, "transactions": 0 });
                    }
                }
                var sortedGroups = _.sortBy(groups, o => o.transactionOn);
                pending = sortedGroups.length;
                let chartLabels = [];
                let data = [];
                _.forIn(sortedGroups, function (value, key) {
                    pending--;
                    chartLabels.push(value["transactionOn"]);
                    data.push(value["transactions"]);
                });
                if (pending == 0) {
                    chartData = [];
                    chartData.push({
                        "data": data,
                        label: 'Account A',
                        borderColor: 'rgb(169,169,169)',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        pointColor: 'rgb(169,169,169)'
                    });
                    var transactionsChartData = {
                        "chartData": chartData,
                        "chartLabels": chartLabels
                    }
                    return resolve(transactionsChartData);
                }
            });

    })
}
var categoryChartData = function (uerName, year, month) {
    return new Promise((resolve, reject) => {
        var period = moment().year(year).month(month - 1).date(1).format('YYYY-MM');
        Budgetmodule.FindBudgets(uerName, period)
            .then(budgets => {
                let chartLabels = [];
                let data = [];
                var groups = _(budgets)
                    .filter(['category.categoryType', 'EXPENDITURE'])
                    .groupBy('category.categoryName')
                    .map(function (budgets, categoryName) {
                        return {
                            category: categoryName,
                            total: _.sumBy(budgets, 'actual')
                        };
                    }).value();
                pending = groups.length;
                _.forIn(groups, function (value, key) {
                    pending--;
                    chartLabels.push(value["category"]);
                    data.push(value["total"]);
                })
                if (pending == 0) {
                    chartData = [];
                    chartData.push({
                        "data": data
                    });
                    var categoriesChartData = {
                        "chartData": chartData,
                        "chartLabels": chartLabels
                    }
                    return resolve(categoriesChartData);
                }
            })

    })
}
var monthlyChartData = function (uerName) {
    return new Promise((resolve, reject) => {
        var end = moment().format('YYYY-MM');
        //months starts from 0
        var start = moment().subtract(5, 'months').format('YYYY-MM')
        console.log(start + ' ' + end)
        Financemodule.FindBudgetByRange(uerName, start, end)
            .then(budgets => {
                var groups = _(budgets)
                    .filter(['category.categoryType', 'EXPENDITURE'])
                    .groupBy('periodon')
                    .map(function (budgets, periodOn) {
                        return {
                            date: moment(periodOn).format('YYYY-MM'),
                            budget: { "budget": _.sumBy(budgets, 'projected'), "spending": _.sumBy(budgets, 'actual') }
                        };
                    }).value();
                for (var i = 0; i < 6; i++) {
                    let date = moment().subtract(i, 'months').format('YYYY-MM')
                    let check = groups.find(o => o.date === date);
                    if (typeof check === 'undefined') {
                        groups.push({ "date": date, "budget": { "budget": 0, "spending": 0 } });
                    }
                }
                pending = groups.length;
                let chartLabels = [];
                let budgetData = [];
                let spendingDate = [];
                _.forIn(groups, function (value, key) {
                    pending--;
                    chartLabels.push(moment(value["date"]).format('MMMM'));
                    budgetData.push(value["budget"]["budget"]);
                    spendingDate.push(value["budget"]["spending"]);
                });
                if (pending == 0) {
                    chartData = [];
                    chartData.push({
                        "data": budgetData,
                        label: 'budget',
                    });
                    chartData.push({
                        "data": spendingDate,
                        label: 'spending',
                    });
                    var transactionsChartData = {
                        "chartData": chartData,
                        "chartLabels": chartLabels
                    }
                    return resolve(transactionsChartData);
                }
            })

    })
}
module.exports = {
    TransactionsChartData: transactionsChartData,
    CategoryChartData: categoryChartData,
    MonthlyChartData: monthlyChartData
};