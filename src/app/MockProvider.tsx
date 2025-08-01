'use client';

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/mocks/startMock');
}

export default function MockProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
