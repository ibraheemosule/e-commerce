import { Schema, Model, Document, models, model } from "mongoose";
import { OrderType } from "./../../../utils/ts-types/__store/typesUser";

export interface IOrderModel extends Document, OrderType {}

const orderSchema = new Schema({
  buyer: {
    type: String,
    required: true,
    minLength: 12,
    lowercase: true,
  },

  items: {
    type: [
      {
        quantity: Number,
        size: {
          type: Schema.Types.Mixed,
          required: false,
        },
        image: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        tag: {
          type: String,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    required: true,
    lowercase: true,
  },

  amount: {
    type: Number,
    required: true,
    minLength: 2,
    maxLength: 25,
  },

  time: {
    type: String,
    required: true,
  },

  deliveryDetails: {
    type: {
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      state: String,
      phoneNo: String,
    },
    required: true,
    lowercase: true,
  },
});

export const OrderModel =
  models.order || model<OrderType, Model<IOrderModel>>("order", orderSchema);
