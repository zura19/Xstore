import NextAuth, { JWT } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "./lib/db";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

const protectedPages = ["/profile"];

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
          name: realUser.username,
          email: realUser.email,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      // Check if the page is protected and user is not logged in
      const isProtectedPage = protectedPages.includes(request.nextUrl.pathname);
      if (isProtectedPage && !isLoggedIn) {
        // Redirect to login if trying to access protected page without being authenticated
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true; // Allow access if no restriction
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Add role to the token
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
        };
      }
      return session;
    },
  },
  pages: {
    // signIn: "/login",
  },
});
