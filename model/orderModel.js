const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
    },
    contactNumber: {
      type: String,
    },
    items: {
      type: [
        {
          id: {
            type: String,
          },
          itemName: {
            type: String,
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
    coustomerName: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    deliveryDescription: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true } 
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
