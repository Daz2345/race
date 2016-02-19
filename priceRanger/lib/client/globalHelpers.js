Template.registerHelper('formatDate', function(date) {
  // return moment(date).format('HH:mm - DD-MM-YYYY');
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
});
});

Template.registerHelper('formatNoDecimals', function(number) {
  return numeral(number).format('0,0');
});

Template.registerHelper('formatCurrency', function(number) {
  return numeral(number).format('$0,0.00');
});

Template.registerHelper('formatCurrencyNoDecimals', function(number) {
  return numeral(number).format('$0,0');
});