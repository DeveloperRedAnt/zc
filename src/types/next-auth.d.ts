import type { Organization } from '@/__generated__/api/dto/auth.dto';
import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      name?: string;
      email?: string;
      image?: string;
      organization?: Organization; // <-- pindahkan ke dalam user
    } & DefaultSession['user'];
    token?: string;
    selectedOrganization?: string;
    organization?: Organization;
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
    selectedOrganization?: string;
  }
}
