// next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    username: string; // Add username field
  }

  interface Session extends DefaultSession {
    user: User; // Ensure session has the updated user type
  }
}
