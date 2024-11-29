import * as mongoose from "mongoose";
import { model, AggregatePaginateModel } from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    schoolName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    email: {
      type: String,
    },

    contactPersonName:{
      type: String,
    },

    password: {
      type: String,
    },
    
    address: {
      type: String,
    },
    type: {
      type: String,
      enum: ["School","Teacher"],
      default: "School",
    },

    country: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

mongoose.plugin(aggregatePaginate);
User.index({ user_location: "2dsphere" });

export default model<any, AggregatePaginateModel<any>>("User", User);
