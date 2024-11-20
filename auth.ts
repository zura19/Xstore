import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "./lib/db";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

const protectedPages = ["/account"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "username", placeholder: "Username" },
        password: { type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const realUser = await User.findOne({
          username: credentials.username,
        });

        if (
          !realUser ||
          !(await bcrypt.compare(
            credentials.password as string,
            realUser.password
          ))
        ) {
          return null;
        }

        return {
          id: realUser?._id?.toString() || "",
          role: realUser.role || "",
          // image: realUser?.image || "",
          phone: realUser.number,
          name: realUser.username,
          email: realUser.email,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;

      if (protectedPages.includes(pathname) && !isLoggedIn) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Add role to the token
        token.phone = user.phone;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string, // Type assertion here for role
          image: token.image as string,
          phone: token.phone as number,
        };
      }
      return session;
    },
  },
  pages: {
    // signIn: "/login",
  },
});
