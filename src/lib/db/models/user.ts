import { UserType } from "./../../../utils/ts-types/__store/typesUser";
import { Schema, Model, Document, models, model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import bcrypt from "bcrypt";

export interface IUserModel extends Document, UserType {
  password: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      lowercase: true,
    },

    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      minLength: 10,
      unique: true,
      lowercase: true,
    },

    address: {
      type: String,
      required: true,
      lowercase: true,
    },

    city: {
      type: String,
      required: true,
      lowercase: true,
    },

    state: {
      type: String,
      required: true,
      lowercase: true,
    },

    phoneNo: {
      type: String,
      required: true,
      minLength: 11,
      maxLength: 14,
    },

    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toJSON();
});

userSchema.plugin(mongooseLeanVirtuals);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.pre<IUserModel>("updateOne", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = async function (password: string) {
  const hashedPassword = this.password as string;
  try {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
  } catch (e) {
    return false;
  }
};

export const UserModel =
  models.user || model<UserType, Model<IUserModel>>("user", userSchema);
