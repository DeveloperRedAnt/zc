import { apiClientWithHeaders } from "./base.client";

apiClientWithHeaders
// Set auth token for requests
export const setAuthToken = (token: string | null) => {
    if (token) {
      apiClientWithHeaders.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      delete apiClientWithHeaders.defaults.headers.common['Authorization'];
    }
};

