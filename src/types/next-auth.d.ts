import type { Organizations } from '@/__generated__/api/dto/auth.dto';
import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      name?: string;
      email?: string;
      image?: string;
      organizations?: Organizations; // <-- pindahkan ke dalam user
    } & DefaultSession['user'];
    token?: string;
  }

  interface User extends DefaultUser {
    role: string;
    organizations?: Organizations; // <-- tambahkan di User juga
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
    name?: string;
    token?: string;
    organizations?: Organizations;
  }
}
