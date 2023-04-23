import { UserType } from "./../../../utils/ts-types/__store/typesUser";
import { Schema, Model, Document, models, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserModel extends Document, UserType {
  checkPassword: (password: string) => Promise<boolean>;
  password: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
      lowercase: true,
    },

    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      minLength: 12,
      unique: true,
      lowercase: true,
    },

    address: {
      type: String,
      maxLength: 150,
      required: true,
      lowercase: true,
    },

    city: {
      type: String,
      minLength: 2,
      maxLength: 25,
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
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// userSchema.virtual("id").get(function () {
//   return this._id.toJSON();
// });

//userSchema.plugin(mongooseLeanVirtuals);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

userSchema.pre("updateOne", function (next) {
  const update = { ...(this.getUpdate() as IUserModel) };

  if (update.password) {
    bcrypt.hash(update.password, 10, (err, hash) => {
      if (err) return next(err);
      update.password = hash;
      this.setUpdate(update);
      next();
    });
  } else next();
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
