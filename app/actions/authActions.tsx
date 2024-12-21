"use server";
import { signIn, signOut } from "@/auth";
import { connectToDB } from "@/lib/db";
import { signUpSchema } from "@/lib/zod";
import User from "@/models/userModel";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

export async function signInWithGoogle() {
  try {
    await signIn("google");
    // return { success: "User Signed up successfully" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        // case "CredentialsSignin":
        //   return { error: "Invalid username or password" };
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

    await resend.emails.send({
      from: `Xstore <${process.env.SENDER_EMAIL!}>`,
      to: signUpValues.data?.email as string,
      subject: "Welcome to Xstore",
      react: <h1>Thank you for signing up {signUpValues.data?.username}</h1>,
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

export async function changePassword({
  id,
  currentPassword,
  newPassword,
  repeatNewPassword,
}: {
  id: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}) {
  try {
    await connectToDB();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return { error: "No user found with that ID." };
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { error: "Current password is incorrect." };
    }

    // Check if the new password matches the old one
    if (currentPassword === newPassword) {
      return {
        error: "Your new password cannot be the same as the current password.",
      };
    }

    if (newPassword !== repeatNewPassword) {
      return {
        error: "Passwords didn't match",
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    return { success: "Password changed successfully." };
  } catch (err) {
    console.error("Error changing password:", err);
    return {
      error:
        "An error occurred while changing the password. Please try again later.",
    };
  }
}
