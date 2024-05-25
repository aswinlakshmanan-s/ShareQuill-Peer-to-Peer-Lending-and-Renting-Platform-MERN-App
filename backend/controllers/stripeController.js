require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const TransactionModel = require("../models/stripeTransactionModel");

exports.stripeCheckout = async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.images.imageUrl[0]],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      custom_text: {
        shipping_address: {
          message:
            "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
        },
        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("[ERROR] ", error);
    res.status(400).json({ message: error.message });
  }
};

exports.saveTransactionDetails = async (req, res) => {
  try {
    const { sessionId } = req.body;
    console.log("[SESSION_ID] ", sessionId);

    const existingTransactionDetails = await TransactionModel.find({
      sessionId: sessionId,
    });

    if (existingTransactionDetails.length > 0) {
      // Details already exist, return an appropriate response
      res
        .status(400)
        .json({ error: "Transaction details already exist in the database" });
    } else {
      // Retrieve the session details from Stripe using sessionId
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Record the successful transaction in MongoDB
      const transactionDetails = {
        object: session.object,
        sessionId: session.id,
        payment_intent: session.payment_intent,
        payment_status: session.payment_status,
        amount_total: session.amount_total / 100,
        customer_details: session.customer_details,
        transaction_status: session.status,
      };

      const transaction = new TransactionModel(transactionDetails);
      await transaction.save();

      res.json({ message: "Transaction Details saved successfully" });
    }
  } catch (error) {
    console.error("[ERROR] ", error);
    res.status(500).json({ error: "Error recording transaction" });
  }
};
