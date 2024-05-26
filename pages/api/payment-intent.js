import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function fetchPaymentDetails(sessionId) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(sessionId, {
      expand: ["payment_method"],
      api_key: process.env.STRIPE_SECRET_KEY,

      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    // Extract the necessary payment details from the paymentIntent object
    const paymentDetails = {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      // Extract other relevant payment details as needed
    };
    console.log(paymentDetails);
    return paymentDetails;
  } catch (error) {
    console.error(`Failed to fetch payment details: ${error}`);
    throw new Error("Failed to fetch payment details.");
  }
}
