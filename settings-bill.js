var moment = require('moment'); // require
moment().format(); 
module.exports = function BillWithSettings() {

    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;

    var actionList = [];


    var smsTotalCost = 0;

    var callTotalCost = 0;


    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = Number(settings.warningLevel);
        criticalLevel = Number(settings.criticalLevel);

    }

    function getSettings() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel

        }

    }

    function recordAction(action) {
if (!hasReachedCriticalLevel()){
        let cost = 0;
        if (action === 'sms') {

            cost = smsCost
        }
        else if (action === 'call') {
            cost = callCost

        }

        actionList.push({
            type: action,
            cost,
            timestamp: moment().startOf('ss').fromNow()
            

        

        });
}
    }

    function actions() {

        return actionList

    }

    function actionsFor(type) {
        return actionList.filter((action) => action.type == type)

    }

    function getTotal(type) {
        return actionList.reduce((total, action) => {
            let val = action.type === type ? action.cost : 0;
            return total + val;
        }, 0);
    }

    function grandTotal() {
        return getTotal('sms') + getTotal('call');
    }

    function totals() {
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        return {
            smsTotal,
            callTotal,
            grandTotal: grandTotal()

        }


    }

  
    function hasReachedWarningLevel(){
    const total = grandTotal();
    const reachedCriticalLevel = total >= warningLevel && total < criticalLevel

    }

    function hasReachedCriticalLevel(){
    const total = grandTotal(); 
    return total >= criticalLevel;

    }

    function totalClassName() {
        const total = grandTotal();
        if (total >= criticalLevel) {
            return "danger";
        }

        else if (total >= warningLevel && total < criticalLevel) {
            return "warning";
        }

    }










    return {
        setSettings,
        getSettings,
        recordAction,
        actionsFor,
        actions,
        grandTotal,
        getTotal,
        totals,
        totalClassName,
        hasReachedWarningLevel
        

    };
}







