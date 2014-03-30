donate
======

Mobile-friendly donation page. Includes Stripe Checkout, PayPal, Amazon Payments, and Google Wallet.

Created during the [Hacktivation for the Homeless](http://www.hacktivation.org) for [GLIDE](http://glide.org/).

## setup

Copy `index.html`, `main.js` and `style.css` to some web hosting.

### Stripe Checkout

Stripe Checkout depends on a server-side component. [levity/striper](https://github.com/levity/striper) is one bare-bones implementation of that.

Edit the value of `stripePublishableKey` at the top of `main.js` to be the value of your Stripe account's publishable key.

### PayPal

Edit the value of `paypalEmail` at the top of `main.js` to be the email account you wish to receive PayPal donations.

### Amazon Payments

[Sign up for an Amazon Simple Pay Donations account](https://payments.amazon.com/sdui/sdui/donationbutton?ld=NSCBAGooglePA) and fill out their online form to generate the code for your Donate Button. Then strip out all table-related HTML from the generated code, replace the textfield with name="amount" with this:
```
  <input type="hidden" name="amount" id="amazon-amount">
```
and then, in `index.html`, replace the `<form>` tag underneath "Amazon Simple Pay" and its contents with the new code.

### Google Wallet

Create a [Google Wallet Merchant Account] (https://wallet.google.com/merchant/pages/).

Google does not support variable donation amounts. You must decide which donation amounts
to support and create a JWT (JSON Web Token) hash for each amount. This example code includes tokens for amounts of $25, $50, $100, $250, and $500. It hides the Google Wallet option if a custom amount is chosen.

You can create JWT hashes for your own amounts by entering your data into the [Google Wallet Digital Goods Demo](https://sandbox.google.com/checkout/inapp/merchant/demo.html). Use the value 4551884523 in the Expiration Field so that your tokens never expire.

The Seller Data field may be left blank.

Copy and paste the donation amounts and JWT hash values that you generate for each donation value into the
`jwts` array in `main.js`.
