var stripeServerUrl = 'https://stormy-chamber-7425.herokuapp.com/pay',
  currentAmount;

function include(file, callback) {
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

window.stripeComplete = function(result) {
  var modal = $('#result');
  if (result.error) {
    modal.find('.message').text(result.error);
  } else {
    modal.find('.message').text("Thank you so much for your contribution!");
  }
};

var stripeHandler = StripeCheckout.configure({
  key: 'pk_test_WCgvPMzqFrQtoGuDF2EKlLhv',
  token: function(token, args) {
    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
    var data = {token: token.id, email: token.email, amount: currentAmount};
    var url = stripeServerUrl + "?cb=stripeComplete&" + $.param(data);
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
  if (window.console) console.log('amount: ' + currentAmount);
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

  $('#pay-with-card').click(function(e) {
    stripeHandler.open({
      name: 'Glide Foundation',
      description: 'Donation',
      amount: currentAmount * 100
    });
    e.preventDefault();
  });

})
