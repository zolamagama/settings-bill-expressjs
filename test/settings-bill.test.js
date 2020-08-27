let assert = require('assert');
const BillWithSettings = require('../settings-bill');



describe("The bill with settings factory function", function () {

  const settingsBill = BillWithSettings();


  it("should be able record calls", function () {

    settingsBill.recordAction('call');

    assert.equal(1, settingsBill.actionsFor('call').length)

  });

it('should be able to set the settings', function(){

        settingsBill.setSettings({
           smsCost: 2.35,
           callCost: 3.35,
           warningLevel: 30,
           criticalLevel: 65
      });

assert.deepEqual({
  smsCost: 2.35,
  callCost: 3.35,
  warningLevel: 30,
  criticalLevel: 65

    }, settingsBill.getSettings())


});

it('should be able to add the totals', function(){

  const settingsBill = BillWithSettings();

  settingsBill.setSettings({
    smsCost: 3.21,
    callCost: 4.50,
    warningLevel: 30,
    criticalLevel: 65
});

settingsBill.recordAction('sms'),
settingsBill.recordAction('call')

assert.equal(3.21, settingsBill.totals().smsTotal)
assert.equal(4.50, settingsBill.totals().callTotal)
assert.equal(7.71, settingsBill.totals().grandTotal)

});

it('should be able to add more than one call', function(){

  const settingsBill = BillWithSettings();

  settingsBill.setSettings({
    smsCost: 0.00,
    callCost: 4.50,
    warningLevel: 30,
    criticalLevel: 65
});

settingsBill.recordAction('call'),
settingsBill.recordAction('call'),
settingsBill.recordAction('call')

assert.equal(13.5, settingsBill.totals().callTotal)
assert.equal(0.00, settingsBill.totals().smsTotal)
assert.equal(13.5, settingsBill.totals().grandTotal)



});

it('should be able to add more than one sms', function(){

  const settingsBill = BillWithSettings();

  settingsBill.setSettings({
    smsCost: 2.35,
    callCost: 4.50,
    warningLevel: 30,
    criticalLevel: 65
});

settingsBill.recordAction('sms'),
settingsBill.recordAction('sms'),
settingsBill.recordAction('sms'),
settingsBill.recordAction('sms')




assert.equal(0.00, settingsBill.totals().callTotal)
assert.equal(9.4, settingsBill.totals().smsTotal)
assert.equal(9.4, settingsBill.totals().grandTotal)



});

it('should be able to add multiple calls and sms', function(){

  const settingsBill = BillWithSettings();

  settingsBill.setSettings({
    smsCost: 3.21,
    callCost: 4.50,
    warningLevel: 30,
    criticalLevel: 65
});

settingsBill.recordAction('sms'),
settingsBill.recordAction('call'),
settingsBill.recordAction('sms'),
settingsBill.recordAction('call'),
settingsBill.recordAction('sms'),
settingsBill.recordAction('call'),
settingsBill.recordAction('sms'),
settingsBill.recordAction('call')


assert.equal(12.84, settingsBill.totals().smsTotal)
assert.equal(18.00, settingsBill.totals().callTotal)
assert.equal(30.84, settingsBill.totals().grandTotal)

});

it('should be able to know when warning level is reached', function(){

  const settingsBill = BillWithSettings();

  settingsBill.setSettings({
    smsCost: 5,
    callCost: 10,
    warningLevel: 15,
    criticalLevel: 20
});

settingsBill.recordAction('sms'),
settingsBill.recordAction('call'),


assert.strictEqual('warning', settingsBill.totalClassName())



});

it('should be able to know when critical level is reached', function(){

  const settingsBill = BillWithSettings();

  settingsBill.setSettings({
    smsCost: 5,
    callCost: 10,
    warningLevel: 15,
    criticalLevel: 20
});

settingsBill.recordAction('sms'),
settingsBill.recordAction('call'),
settingsBill.recordAction('sms'),



assert.strictEqual('danger', settingsBill.totalClassName())



});









});



