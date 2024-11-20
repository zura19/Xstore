import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),

  price: z
    .number({ required_error: "Title is required" })
    .min(1, "Price must be more than 0"),

  stock: z
    .number({ required_error: "stock is required" })
    .min(1, "Stock must be more than 0"),

  new: z.enum(["true", "false"]).transform((value) => value === "true"),

  discount: z.number().default(0),

  series: z.string(),

  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is requierd"),

  mainImage: z
    .string({ required_error: "Image is required" })
    .min(1, "Image is required"),

  images: z.array(z.string().url()),

  specification: z.object({
    brand: z
      .string({ required_error: "Brand is required" })
      .min(1, "Brand is required"),

    colors: z
      .string({ required_error: "Color is required" })
      .min(1, "Color is requierd"),

    videoCard: z.string(),

    system: z
      .string({ required_error: "System is required" })
      .min(1, "System is required"),

    storage: z
      .string({ required_error: "Storage is required" })
      .min(1, "Storage is required"),

    ram: z
      .string({ required_error: "Ram is required" })
      .min(1, "Ram is required"),
  }),
});

export const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(20, "Too long username"),

  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Enter valid email"),

  number: z
    .number({
      required_error: "Phone number is required",
      invalid_type_error:
        "Number must be a valid numeric value (e.g., 1234567890).",
    })
    .min(1, "Phone number is required"),

  // .regex(/^\d{10}$/, "Number must be a valid 10-digit phone number."),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password must not exceed 32 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter.")
    .regex(/\d/, "Password must include at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character."
    ),
});

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required"),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export const orderSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required"),

  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),

  personId: z
    .string({ required_error: "Id is required" })
    .min(1, "Id is required"),

  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address is required")
    .min(10, "Enter your real address"),

  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Enter valid email"),

  number: z
    .number({
      required_error: "Phone number is required",
      invalid_type_error:
        "Number must be a valid numeric value (e.g., 1234567890).",
    })
    .min(1, "Phone number is required"),

  additionalInfo: z.string(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Enter current password" })
      .min(1, "Enter current password"),

    newPassword: z
      .string({ required_error: "Enter new password" })
      .min(1, "Enter new password")
      .min(8, "Password must be at least 8 characters long.")
      .max(32, "Password must not exceed 32 characters.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/\d/, "Password must include at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character."
      ),
    repeatNewPassword: z
      .string({ required_error: "Repeat new password" })
      .min(1, "Repeat new password"),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"], // Error will be associated with `repeatNewPassword`
  });
