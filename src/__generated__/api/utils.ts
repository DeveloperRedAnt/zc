import Cookies from 'js-cookie';

export const getEssentialCookies = () => {
  const organization_id = Cookies.get('x-device-id') || '1';
  const device_id = Cookies.get('x-device-id') || '1';
  const store_id = Cookies.get('x-store-id') || '1';

  return {
    device_id,
    organization_id,
    store_id,
  };
};
  