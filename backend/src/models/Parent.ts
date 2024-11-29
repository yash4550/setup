import * as mongoose from "mongoose";
import { model, AggregatePaginateModel } from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Parent = new Schema(
  {
    parentName: {
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

    childName:{
      type: String,
    },
    Class:{
        type: String,
    },
    
    type: {
      type: String,
      enum: ["School","Parent"],
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
Parent.index({ user_location: "2dsphere" });

export default model<any, AggregatePaginateModel<any>>("User", Parent);
