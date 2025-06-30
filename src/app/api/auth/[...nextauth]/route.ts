import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock users database
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    password: 'user123',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    role: 'user',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email
        const user = users.find((user) => user.email === credentials.email);

        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          // Return user object without password
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token when first signed in
      if (user) {
        // Use type assertion for custom user properties
        const customUser = user as { id: string; role?: string; name?: string };
        token.id = customUser.id;
        if (customUser.role) token.role = customUser.role;
        if (customUser.name) token.name = customUser.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data from token to the session
      if (session.user) {
        // Use type assertion for the session.user to add custom properties
        const user = session.user as {
          id?: string;
          role?: string;
          name?: string;
          email?: string;
          image?: string;
        };
        user.id = token.id as string;
        // Use interface JWT from types instead of any
        user.role = (token as { role?: string }).role as string;
        user.name = (token as { name?: string }).name as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
