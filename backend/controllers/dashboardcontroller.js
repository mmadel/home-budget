var bodyParser = require('body-parser');
var DashBoardmodule = require('../modules/dashboardmodule');
module.exports = function (app) {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.post('/api/transactionschartdata', function (req, res) {
        let year = req.body.year;
        let month = req.body.month
        let userName = req.body.userName
        DashBoardmodule.TransactionsChartData(userName,year,month)
        .then(result=>{            
            res.send(JSON.stringify(result));
        })
        
    });
    app.post('/api/categorieschartdata', function (req, res) {
        let year = req.body.year;
        let month = req.body.month
        let userName = req.body.userName
        DashBoardmodule.CategoryChartData(userName,year,month)
        .then(result=>{            
            res.send(JSON.stringify(result));
        })
        
    });
    app.post('/api/monthlychartdata', function (req, res) {
        let userName = req.body.userName
        DashBoardmodule.MonthlyChartData(userName)
        .then(result=>{            
            res.send(JSON.stringify(result));
        })
        
    });
}