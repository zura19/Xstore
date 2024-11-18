// types/next-auth.d.ts

import { User as AdapterUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth";

declare module "next-auth" {
  // Extending the session interface to include role
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // Added role here
      image?: string;
    };
  }

  // Extending the user interface (AdapterUser) to include role
  interface User extends AdapterUser {
    id: string;
    name: string;
    email: string;
    role: string; // Added role here
    image?: string;
  }

  // Extending JWT interface to include role
  interface JWT extends NextAuthJWT {
    id: string;
    name: string;
    email: string;
    role: string; // Added role here
    image?: string;
  }
}
