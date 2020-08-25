const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const bodyParser = require('body-parser');

const Settingsbill = require('./settings-bill');

const settingsbill = Settingsbill();


app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index', {

        settings: settingsbill.getSettings(),
        totals: settingsbill.totals(),
        totalClassName: settingsbill.totalClassName(),



    });

});


app.post('/settings', function (req, res) {



    settingsbill.setSettings({

        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,


    })

    console.log(settingsbill.getSettings());


    res.redirect('/');
});


app.post('/action', function (req, res) {

    settingsbill.recordAction(req.body.actionType)
 
    res.redirect('/');

});


app.get('/actions', function (req, res) {

    res.render('actions', { actions: settingsbill.actions() });
});

app.get('/actions/:actionType', function (req, res) {

    // res.render('actions', { actions: settingsbill.actions() });

    const actionType = req.params.actionType;
    res.render('actions', { actions: settingsbill.actionsFor(actionType) })

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});