import axios from 'axios';
import Config from "./config/config";
import Utility from './common/utility';
import TokenFreeApis from './common/tokenFreeApi';
import URLS from './common/api';
import rootStore from './stores/RootStore';

/**
 * make custom axios request.
 */
const http = axios.create({
  baseURL: Config.baseURL,
  timeout: Config.timeout,
  // headers: { Pragma: "no-cache" },
});

/**
 * 
 * @param {*} headers api response header
 * checking refresh token is expired or not.
 */
const isRefreshTokenExpired = (headers) => {
  // console.log('history', history)
  return false;
}

const goToLogin = () => {
  rootStore.loginStore.logout();
  window.location = '';
}

/**
 * 
 * @param {*} headers api response header
 * checking access token is expired or not.
 */
const isAccessTokenExpired = (headers) => {
  if (Utility.stringToBoolean(headers['access-token-expired']) || Utility.stringToBoolean(headers['invalid-token'])) {
    return true;
  }
  return false;
}

/**
 * 
 * @param {*} originalRequest api request object for which access token is expired.
 * gets the access token and hit the original api for which access token is expired.
 */
const getRefreshedToken = (originalRequest) => {
  return http.get(`${URLS.refreshToken}`).then(res => {
    console.log('resss', res);
    return http(originalRequest);
  }).catch(err => {
    console.log('errrr in refresh token', err);
    return err;
  })
}

/**
 * Redirect to login if user is not authenticate i.e api send 401 status.
 */
const redirectUnAuth = (response) => {
  if (response.status === 401 || response.status === 403) {
    Utility.clearAllData(); // Clear the localStorage.
    // router.replace({
    //   name: 'Login',
    // }); // Go to the Login Page
  }
};

/**
 * Check url needs token or not.
 */
const checkToken = (url) => {
  const isTokenRequired = !TokenFreeApis.find(item => item === url);
  if (isTokenRequired) {
    return true;
  }
  return false;
};

/**
 * Interceptor for api request.
 */
http.interceptors.request.use((request) => {
  // GET Token and add token to request if any api needed.
  if (checkToken(request.url)) {
    request.headers.authorization = `Bearer ${Utility.getToken('accessToken')}`; // eslint-disable-line
  }
  // console.log('request', request)
  return request;
}, error => Promise.reject(error));

/**
 * Interceptor for api response.
 */
http.interceptors.response.use((response) => {
  // Check for unauthorized request.
  // redirectUnAuth(response);
  // Check access token is expired or not.
  const originalRequest = response.config;
  // return http(originalRequest);

  if (isRefreshTokenExpired()) {
    console.log('logout the user');
    goToLogin();
  } else if (isAccessTokenExpired(response.headers)) {
    // hit api for getting the refreshed access token.
    goToLogin();
    // return getRefreshedToken(originalRequest);
  } else {
    // Set tokens.
    if (response.status === 200 && response.data.access) {
      Utility.setToken('accessToken', response.data.access);
    }

    if (response.status === 200 && response.data.refresh) {
      Utility.setToken('refreshToken', response.data.refresh);
    }
    return response.data;
  }
}, (error) => {
  console.log('error', error)
  if (error.response) {
    redirectUnAuth(error.response);
    return Promise.reject(error.response.data);
  }
  if (error.message === 'Network Error') {
    // network error
    const networkError = {
      errorCodeList: ['NETWORK'],
    };
    return Promise.reject(networkError);
  } else if (error.message === `timeout of ${Config.timeout}ms exceeded`) {
    // timeout error
    const timeoutError = {
      errorCodeList: ['TIMEOUT'],
    };
    return Promise.reject(timeoutError);
  }
  return Promise.reject(error);
});

export default http;
