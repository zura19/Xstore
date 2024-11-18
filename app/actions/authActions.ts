"use server";
import { signIn, signOut } from "@/auth";
import { connectToDB } from "@/lib/db";
import { signUpSchema } from "@/lib/zod";
import User from "@/models/userModel";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

export async function signInWithCredentials(values: {
  username: string;
  password: string;
}) {
  try {
    const { username, password } = values;
    await signIn("credentials", { username, password, redirect: false });
    // return { success: "User Signed up successfully" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid username or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
}

export async function handleSignOut() {
  try {
    await signOut({ redirect: false });
    // return { success: "User Signed out successfully" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
}

export async function signUp(values: {
  username: string;
  email: string;
  number: number;
  password: string;
}) {
  try {
    await connectToDB();
    console.log(values);
    const signUpValues = signUpSchema.safeParse(values);
    if (signUpValues.error) {
      console.log(signUpValues.error.message);
    }

    const isUsernameUsed = await User.findOne({
      username: signUpValues.data?.username,
    });
    if (isUsernameUsed) {
      return { error: "Username is alredy Used" };
    }
    const isEmailUsed = await User.findOne({
      email: signUpValues.data?.email,
    });
    if (isEmailUsed) {
      return { error: "Email is alredy Used" };
    }

    const hashedPassword = await bcrypt.hash(
      signUpValues.data?.password as string,
      10
    );

    await User.create({
      username: signUpValues.data?.username,
      email: signUpValues.data?.email,
      number: signUpValues.data?.number,
      password: hashedPassword,
    });
    return { success: "User created successfully" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        // case "CredentialsSignin":
        //   return { message: "Invalid Credentials" };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw err;
  }
}
