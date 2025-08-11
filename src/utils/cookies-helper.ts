import Cookies from 'js-cookie';

export function getStoreID(): number {
  const value = Cookies.get('x-store-id') ?? '0';
  const id = parseInt(value);
  return Number.isNaN(id) ? 0 : id;
}
