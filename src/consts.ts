export const UNIQUE_PREFIX = (window as any)._env_
  ? (window as any)._env_.REACT_APP_UNIQUE_PREFIX
  : process.env.REACT_APP_UNIQUE_PREFIX || 'gemline-';

export const API_URL = (window as any)._env_
  ? (window as any)._env_.REACT_APP_API_URL
  : process.env.REACT_APP_API_URL || 'https://svc.gemline.dev';

export const LANDING_URL = (window as any)._env_
  ? (window as any)._env_.REACT_APP_LANDING_URL
  : process.env.REACT_APP_LANDING_URL || 'https://gemline.dev';

export const SIGNIN_URL = (window as any)._env_
  ? (window as any)._env_.REACT_APP_SIGNIN_URL
  : process.env.REACT_APP_SIGNIN_URL || 'https://gemline.dev/authentication/login';

export const SIGNUP_URL = (window as any)._env_
  ? (window as any)._env_.REACT_APP_SIGNUP_URL
  : process.env.REACT_APP_SIGNUP_URL || 'https://gemline.dev/authentication/registration';

export const DOMAIN_URL = (window as any)._env_
  ? (window as any)._env_.REACT_APP_DOMAIN_URL
  : process.env.REACT_APP_DOMAIN_URL || '.gemline.dev';

export const decimal = BigInt('1000000000000000000');
