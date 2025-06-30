import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  type Session = {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  };

  type User = {
    role: string;
  } & DefaultUser;
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
    name?: string;
  }
}
