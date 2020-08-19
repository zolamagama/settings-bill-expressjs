module.exports = function BillWithSettings() {
    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;


    var smsTotalCost = 0;

    var callTotalCost = 0;


function setSettings (settings){
    smsCost = Number(settings.smsCost);
    callCost = Number(settings.callCost);
    warningLevel = Number(settings.warningLevel);
    criticalLevel = Number(settings.criticalLevel);

}

function getSettings () {
    return {
        smsCost,
        callCost,
        warningLevel,
        criticalLevel

    }

}









    // function setCallCost(callCost) {
    //     theCallCost = callCost;

    // }

    // function getCallCost() {

    //     return theCallCost;
    // }

    // function setSmsCost(smsCost) {
    //     theSmsCost = smsCost;

    // }

    // function getSmsCost() {
    //     return theSmsCost;
    // }

    // function setWarningLevel(warningLevel) {
    //     theWarningLevel = warningLevel;
    // }

    // function getWarningLevel() {
    //     return theWarningLevel;
    // }

    // function setCriticalLevel(criticalLevel) {
    //     theCriticalLevel = criticalLevel;
    // }

    // function getCriticalLevel() {
    //     return theCriticalLevel;
    // }

    function calculateTot(name) {
        if (!hasReachedTheCriticalLevel()) {
            if (name === "call") {
                callTotalCost += theCallCost;
            }
            if (name === "sms") {
                smsTotalCost += theSmsCost;
            }
        }
    }

    function getTotalCost() {

        return callTotalCost + smsTotalCost;
    }

    function getTotalCallCost() {
        return callTotalCost;
    }

    function getTotalSmsCost() {
        return smsTotalCost;
    }

    // // function sendSms() {
    // //     if (!hasReachedTheCriticalLevel()) {
    // //         smsTotalCost += theSmsCost;
    // //     }


    // }

    function hasReachedTheCriticalLevel() {
        return getTotalCost() >= getCriticalLevel();

    }


    function totalClassName() {
        if (hasReachedTheCriticalLevel()) {
            return "danger";
        }

        if (getTotalCost() >= getWarningLevel()) {
            return "warning";
        }

    }
    return {
        setSettings,
        getSettings,
        // setCallCost,
        // getCallCost,
        // setSmsCost,
        // getSmsCost,
        // setWarningLevel,
        // getWarningLevel,
        // setCriticalLevel,
        // getCriticalLevel,
        calculateTot,
        getTotalCallCost,
        getTotalSmsCost,
        getTotalCost,
        totalClassName,
        hasReachedTheCriticalLevel

    };
}