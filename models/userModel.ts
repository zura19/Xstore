// models/User.ts
import mongoose, { Schema, Model } from "mongoose";

// Interface for the User model
interface IUser {
  number: number;
  email: string;
  password: string;
  username: string;
  role: string;
  // checkPassword(inputPassword: string): Promise<boolean>;
}

// User schema definition
const UserSchema: Schema<IUser> = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Email must be a valid email address.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"], // Example roles
      default: "user",
    },
  },
  { timestamps: true }
);

// Method to check the password

// Export the model
const User: Model<IUser> =
  mongoose?.models?.User || mongoose?.model<IUser>("User", UserSchema);

export default User;
