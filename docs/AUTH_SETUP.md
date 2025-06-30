# NextAuth.js Authentication Setup

This project uses NextAuth.js for authentication with a mock/dummy login system.

## Setup Instructions

1. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   ```

   You can generate a secure secret with:
   ```bash
   openssl rand -base64 32
   ```
   Or visit [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

2. Start the development server:
   ```bash
   pnpm dev
   ```

## Mock User Credentials

The system includes two pre-configured mock users:

1. Admin User
   - Email: `admin@example.com`
   - Password: `admin123`
   - Role: `admin`

2. Test User
   - Email: `user@example.com`
   - Password: `user123`
   - Role: `user`

## Authentication Flow

- The sign-in page is at `/sign-in`
- The sign-up page is at `/sign-up` (this is a mock form that doesn't actually create new users)
- Protected routes are under `/dashboard/*`
- You can view your session info on the dashboard page
- A sign-out button is available on the dashboard

## Implementation Details

- Uses NextAuth.js with a Credentials provider
- JWT-based sessions with custom user roles
- Server-side authentication checking via middleware
- Client-side session management

To modify the mock users or add additional authentication providers, edit the NextAuth.js configuration file at:
`src/app/api/auth/[...nextauth]/route.ts`
