'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")("sk_test_51ItgIDIzRZgx8788uAVXgQhhFYKzbsPjQPV1SFmDzQvuXkvknjcISqSORdDFL9DZBNQHf1uU3paVSGmDEBJRHMci00t98q7Yxk");
module.exports = {

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { email,amount,paymentMethodId,virtualProducts,priceId } = JSON.parse(
      ctx.request.body
    );
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    console.log("log");

    const customer = await stripe.customers.create({
      email
    });


    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id
      });
    } catch (error) {
    }

    // Change the default invoice settings on the customer to the new payment method
    await stripe.customers.update(
      customer.id,
      {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      }
    );

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId}],
    });

    // Register the order in the database
   const sub = await strapi.services.subscription.create({
      user: ctx.state.user.id,
      subscription_id: subscription.id,
      email,
      amount: stripeAmount,
      virtualProducts,
    });

   return sub;
  },
};
