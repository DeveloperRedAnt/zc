'use client';

import { setAuthToken } from '@/__generated__/api/client/auth.client';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

const SetAxiosToken = () => {
  const { data: session, status } = useSession();
  const initialLoadRef = useRef(true);

  // Immediately apply token from cookies on first render
  useEffect(() => {
    const cookieToken = Cookies.get('token');
    if (cookieToken && initialLoadRef.current) {
      setAuthToken(cookieToken);
      initialLoadRef.current = false;
    }
  }, []);

  // Handle session updates and sync with cookies
  useEffect(() => {
    const sessionToken = status === 'authenticated' && session?.token ? session.token : '';
    const cookieToken = Cookies.get('token');

    if (status !== 'authenticated') {
      Cookies.remove('token');
      setAuthToken('');
      return;
    }

    // Set auth token on successful authentication
    if (sessionToken) {
      setAuthToken(sessionToken);

      // Update cookie if token changed
      if (cookieToken !== sessionToken) {
        Cookies.set('token', sessionToken);
      }
    }
  }, [session?.token, status]);

  return null;
};

export default SetAxiosToken;
