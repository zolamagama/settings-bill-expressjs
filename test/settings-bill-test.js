let assert = require('assert');
const BillWithSettings = require('../settings-bill');



describe ("The bill with settings factory function", function() {

    it ("should be able to set the call cost", function () {
      let settingsBill = BillWithSettings();

      settingsBill.setCriticalLevel(10);
     settingsBill.setCallCost(1.85); 
     assert.equal(1.85, settingsBill.getCallCost());

     let settingsBill2 = BillWithSettings();

     settingsBill2.setCallCost(2.55); 
     assert.equal(2.55, settingsBill2.getCallCost());
    })
   
    it ("should be able to set the sms cost", function () {
        let settingsBill = BillWithSettings();

       settingsBill.setSmsCost(0.85); 
       assert.equal(0.85, settingsBill.getSmsCost());
  
       let settingsBill2 = BillWithSettings();

       settingsBill2.setSmsCost(0.55); 
       assert.equal(0.55, settingsBill2.getSmsCost())
      })

      it ("should be able to set the sms and call cost", function () {
        let settingsBill = BillWithSettings();
        settingsBill.setSmsCost(0.85); 
       settingsBill.setCallCost(1.85); 
  
    assert.equal(0.85, settingsBill.getSmsCost());
    assert.equal(1.85, settingsBill.getCallCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setSmsCost(0.55); 
   settingsBill2.setCallCost(2.55); 


   
assert.equal(0.55, settingsBill2.getSmsCost());
assert.equal(2.55, settingsBill2.getCallCost());


      }); 

      it ("should be able to set the warning level", function () {

        let settingsBill = BillWithSettings();
        settingsBill.setWarningLevel(20);

  
    assert.equal(20, settingsBill.getWarningLevel());
    
 
      }); 
      
      it ("should be able to set the critical level", function () {

        let settingsBill = BillWithSettings();
        settingsBill.setCriticalLevel(30);
  
        assert.equal(30, settingsBill.getCriticalLevel());
 
      });       
      
      it ("should be able to set the warning and critical level", function () {

        let settingsBill = BillWithSettings();
        settingsBill.setWarningLevel(15);
        settingsBill.setCriticalLevel(25);
  
    assert.equal(15, settingsBill.getWarningLevel());
    assert.equal(25, settingsBill.getCriticalLevel());
 
      });  
      
});

describe ("Use values", function() {
    it("should be able to use call cost set 3 call at 2.25 each", function() {
          let settingsBill = BillWithSettings();

settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(2.25); 
   settingsBill.setSmsCost(0.70);
    
   settingsBill.calculateTot("call");
   settingsBill.calculateTot("call");
   settingsBill.calculateTot("call");


   assert.equal(6.75, settingsBill.getTotalCallCost());
   assert.equal(0.00, settingsBill.getTotalSmsCost());
   assert.equal(6.75, settingsBill.getTotalCost());
    });

    it("should be able to use call cost set for 2 call at 1.35 each", function() {
        let settingsBill = BillWithSettings();

settingsBill.setCriticalLevel(10);
  settingsBill.setCallCost(1.35); 
 settingsBill.setSmsCost(0.70);
  
 settingsBill.calculateTot("call");
 settingsBill.calculateTot("call");

 assert.equal(2.70, settingsBill.getTotalCallCost());
 assert.equal(0.00, settingsBill.getTotalSmsCost());
 assert.equal(2.70, settingsBill.getTotalCost());
  });

  it("should be able to send 2 sms's at 0.85 each", function() {
    let settingsBill = BillWithSettings();

    settingsBill.setCriticalLevel(10);
settingsBill.setCallCost(1.35); 
settingsBill.setSmsCost(0.85);

settingsBill.calculateTot("sms");
settingsBill.calculateTot("sms");

assert.equal(0.00, settingsBill.getTotalCallCost());
assert.equal(1.70, settingsBill.getTotalSmsCost());
assert.equal(1.70, settingsBill.getTotalCost());
});

it("should be able to send 2 sms's at 0.85 each & 1 call at 1.35", function() {
    let settingsBill = BillWithSettings();
settingsBill.setCriticalLevel(10);
settingsBill.setCallCost(1.35); 
settingsBill.setSmsCost(0.85);

settingsBill.calculateTot("call");
settingsBill.calculateTot("sms");
settingsBill.calculateTot("sms");

assert.equal(1.35, settingsBill.getTotalCallCost());
assert.equal(1.70, settingsBill.getTotalSmsCost());
assert.equal(3.05, settingsBill.getTotalCost());
});
});

describe("warning and critical level", function () {
it ("should return a class name of 'warning' if warning level is reached", function() {

    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(1.35); 
settingsBill.setSmsCost(0.85);
settingsBill.setWarningLevel(5);
settingsBill.setCriticalLevel(10);


settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("sms");
settingsBill.calculateTot("sms");

    assert.equal("warning", settingsBill.totalClassName());

});

it ("should return a class name of 'danger' if critical level has been reached", function() {

    let settingsBill = BillWithSettings();


settingsBill.setCallCost(2.50); 
settingsBill.setSmsCost(0.75);
settingsBill.setCriticalLevel(10);

settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("sms");
settingsBill.calculateTot("sms");

    assert.equal("danger" , settingsBill.totalClassName());

});

it ("should stop the call total from increasing when the critical level has been reached", function() {

    let settingsBill = BillWithSettings();


settingsBill.setCallCost(2.50); 
settingsBill.setSmsCost(0.75);
settingsBill.setCriticalLevel(10);

settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");

    assert.equal("danger", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCallCost());

});

it ("should allow the totals to increase after reaching the critical level & then upping the critical level", function() {

    let settingsBill = BillWithSettings();


settingsBill.setCallCost(2.50); 
settingsBill.setSmsCost(0.75);
settingsBill.setWarningLevel(8);
settingsBill.setCriticalLevel(10);

settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");
settingsBill.calculateTot("call");

    assert.equal("danger", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCallCost());

    settingsBill.setCriticalLevel(20);

    assert.equal("warning", settingsBill.totalClassName());
    settingsBill.calculateTot("call");
    settingsBill.calculateTot("call");
    assert.equal(15, settingsBill.getTotalCallCost());

    

});
});