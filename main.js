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
};

var validateAmount = function(callback) {
    if (parseInt(currentAmount).toString() == currentAmount) {
        callback();
    } else {
        alert('Please enter a valid amount.');
        $('[name="custom_amount"]').val('').focus();
    }
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
})
