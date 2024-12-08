import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import prisma from './utils/db';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Check user against database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error('Invalid email address'); // No user found
        }

        // Verify the password using bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user?.password as string
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password'); // Invalid password
        }

        // Return user data if credentials are valid
        return {
          id: user.id,
          email: user.email,
          username: user.username as string,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username; // TypeScript will recognize this now
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string; // TypeScript will recognize this now
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
