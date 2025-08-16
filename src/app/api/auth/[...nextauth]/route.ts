import type { Organizations } from '@/__generated__/api/dto/auth.dto';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Menggunakan API URL dari environment variable atau fallback ke default URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-zycas.eling.my.id';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        whatsapp: {
          label: 'Nomor WhatsApp',
          type: 'tel',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const whatsapp = credentials?.whatsapp ?? '';
          const password = credentials?.password ?? '';
          if (!whatsapp || !password) return null;

          const response = await axios.post(
            `${API_URL}/api/employee/token`,
            {
              phone: whatsapp,
              password: password,
            },
            {
              headers: {
                accept: 'application/json',
                'x-device-id': '1',
                'x-store-id': '1',
                'x-organization-id': '1',
                'Content-Type': 'application/json',
              },
            }
          );
          const data = response.data;
          if (data?.token) {
            return {
              id: data.user.id,
              whatsapp: whatsapp,
              token: data.token,
              role: data.role || 'admin',
              organizations: data.organizations,
            };
          }
          return null;
        } catch (_e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as {
          id: string;
          role?: string;
          name?: string;
          token?: string;
          organizations: Organizations;
        };
        token.id = customUser.id;
        if (customUser.role) token.role = customUser.role;
        if (customUser.name) token.name = customUser.name;
        if (customUser.token) token.token = customUser.token;
        if (customUser.organizations) token.organizations = customUser.organizations;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Define proper types to avoid TypeScript errors
        type UserWithCustomProps = typeof session.user & {
          organizations?: Organizations;
          id?: string;
          role?: string;
          name?: string;
        };

        // Cast user with proper type
        const user = session.user as UserWithCustomProps;

        // Assign properties
        user.organizations = token.organizations as Organizations;
        user.id = token.id as string;
        user.role = (token as { role?: string }).role as string;
        user.name = (token as { name?: string }).name as string;

        // Handle token
        if (token.token) {
          (session as typeof session & { token?: string }).token = (token as { token?: string })
            .token as string;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
