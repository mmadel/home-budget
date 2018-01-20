var bodyParser = require('body-parser');
var DashBoardmodule = require('../modules/dashboardmodule');
module.exports = function (app) {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.post('/api/transactionschartdata', function (req, res) {
        let year = req.body.year;
        let month = req.body.month
        DashBoardmodule.TransactionsChartData('mmadel',year,month)
        .then(result=>{            
            res.send(JSON.stringify(result));
        })
        
    });
    app.post('/api/categorieschartdata', function (req, res) {
        let year = req.body.year;
        let month = req.body.month
        DashBoardmodule.CategoryChartData('mmadel',year,month)
        .then(result=>{            
            res.send(JSON.stringify(result));
        })
        
    });
    app.post('/api/monthlychartdata', function (req, res) {
        DashBoardmodule.MonthlyChartData('mmadel')
        .then(result=>{            
            res.send(JSON.stringify(result));
        })
        
    });
}