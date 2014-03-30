var stripePublishableKey = 'pk_test_WCgvPMzqFrQtoGuDF2EKlLhv';
var stripeServerUrl      = 'https://stormy-chamber-7425.herokuapp.com/pay';
var organizationName     = 'Glide Foundation';
var successText          = 'Thank you so much for your contribution!';
var paypalEmail          = 'paypal@glide.org';

var currentAmount;

var include = function(file, callback) {
  var head      = document.getElementsByTagName('head')[0];
  var script    = document.createElement('script');
  script.type   = 'text/javascript';
  script.src    = file;
  script.onload = script.onreadystatechange = function() {
    // execute dependent code
    if (callback) callback();
    // prevent memory leak in IE
    head.removeChild(script);
    script.onload = null;
  };
  head.appendChild(script);
};

window.showResult = function(result) {
  var modal = $('#result');
  if (!modal.is(':visible')) modal.modal();
  if (result.error) {
    modal.find('.message').text(result.error);
  } else {
    modal.find('.message').text(successText);
  }
};

var stripeHandler = StripeCheckout.configure({
  key: stripePublishableKey,
  token: function(token, args) {
    var data = {token: token.id, email: token.email, amount: currentAmount};
    var url = stripeServerUrl + "?cb=showResult&" + $.param(data);
    $('#result').find('.message').text('Please wait...').end().modal();
    include(url);
  }
});

var updateAmount = function() {
  var amount = $('[name="amount"]:checked').val();
  if (amount == 'custom')
    amount = $('[name="custom_amount"]').val();

  currentAmount = amount;
  $('#paypal-amount').val(currentAmount);
  $('#amazon-amount').val('USD ' + currentAmount);

  if (!jwts[currentAmount]) {
    $('#google-wallet-col').hide();
  } else {
    $('#google-wallet-col').show();
  }
};

var validateAmount = function(callback) {
  if (parseInt(currentAmount).toString() == currentAmount) {
    callback();
  } else {
    alert('Please enter a valid amount.');
    $('[name="custom_amount"]').val('').focus();
  }
};

jwts = {
  '25':  "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjE3MjcxNjk0OTk0O" +
         "TgwMzM3MiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" +
         "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzk2MjAyN" +
         "TU1LCJleHAiOjQ1NTE4NzYxMDAsInJlcXVlc3QiOnsiY3VycmV" +
         "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIyNS4wMCIsIm5hbWUiO" +
         "iIkMjUgRG9uYXRpb24iLCJkZXNjcmlwdGlvbiI6IkEgJDI1IER" +
         "vbmF0aW9uIHRvIEdsaWRlIn19.t41DKBOezXBOuqOICtbq2-UF" +
         "FPC98j324_G8hUbvlqg",
  '50':  "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjE3MjcxNjk0OTk0O" +
         "TgwMzM3MiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" +
         "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzk2MjAyN" +
         "jQ0LCJleHAiOjEzOTYyODkwNDQsInJlcXVlc3QiOnsiY3VycmV" +
         "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiI1MC4wMCIsIm5hbWUiO" +
         "iIkNTAgRG9uYXRpb24iLCJkZXNjcmlwdGlvbiI6IkEgJDUwIER" +
         "vbmF0aW9uIHRvIEdsaWRlIn19.qFA_cUI5s2OUvVIe7U075iDu" +
         "xlaNb79uzNEj51AQUO8",
  '100': "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjE3MjcxNjk0OTk0O" +
         "TgwMzM3MiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" +
         "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzk2MjAyN" +
         "zk2LCJleHAiOjEzOTYyODkxOTYsInJlcXVlc3QiOnsiY3VycmV" +
         "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIxMDAuMDAiLCJuYW1lI" +
         "joiJDEwMCBEb25hdGlvbiIsImRlc2NyaXB0aW9uIjoiQSAkMTA" +
         "wIERvbmF0aW9uIHRvIEdsaWRlIn19.fUBIhAKZD9xBOIBPU4s7" +
         "27MLfvyhif982I_7JnWeVsE",
  '250': "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjE3MjcxNjk0OTk0O" +
         "TgwMzM3MiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" +
         "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzk2MjAyO" +
         "DQwLCJleHAiOjEzOTYyODkyNDAsInJlcXVlc3QiOnsiY3VycmV" +
         "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIyNTAuMDAiLCJuYW1lI" +
         "joiJDI1MCBEb25hdGlvbiIsImRlc2NyaXB0aW9uIjoiQSAkMjU" +
         "wIERvbmF0aW9uIHRvIEdsaWRlIn19.McXgZdjeVES2kGqc9WlL" +
         "vt1XePZnJJolDWOEyoHiCTI",
  '500': "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjE3MjcxNjk0OTk0O" +
         "TgwMzM3MiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9" +
         "wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzk2MjAyO" +
         "TE1LCJleHAiOjEzOTYyODkzMTUsInJlcXVlc3QiOnsiY3VycmV" +
         "uY3lDb2RlIjoiVVNEIiwicHJpY2UiOiI1MDAuMDAiLCJuYW1lI" +
         "joiJDUwMCBEb25hdGlvbiIsImRlc2NyaXB0aW9uIjoiQSAkNTA" +
         "wIERvbmF0aW9uIHRvIEdsaWRlIn19.lvPaGmy_tYY9UCwZ5GtP" +
         "YTX1BNKi8hhaGm2jkmwlzqQ"
};

$(function() {
  // allow clicking anywhere in the list group item to select an amount
  $('.amounts .list-group-item').click(function() {
    $('.amounts input').prop('checked', false);
    $(this).find('input').prop('checked', true);
    updateAmount();
  });

  // keep the amount up to date as the selection changes
  $('[name="amount"], [name="custom_amount"]').change(function() {
    updateAmount();
  });

  // initialize the value from the first selected radio button
  updateAmount();

  $('.continue button').click(function() {
    validateAmount(function() {
      $('#pick-method').collapse({parent: '#accordion', toggle: true});
    })
    return false;
  })

  // set up PayPal variables
  $('#paypal [name="business"]').val(paypalEmail);

  $('#pay-with-card').click(function(e) {
    stripeHandler.open({
      name: organizationName,
      description: 'Donation',
      amount: currentAmount * 100
    });
    e.preventDefault();
  });

  $('#google-wallet').click(function() {
    google.payments.inapp.buy({
      parameters: {},
      jwt: jwts[currentAmount]
    })
  });
})
