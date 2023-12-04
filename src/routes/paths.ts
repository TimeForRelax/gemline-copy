import { CombinedRoutes, View } from '@routes/routeInterfaces';
import { PathParams, QueryParams } from '@routes/types';
import { isEmpty } from 'underscore';
import queryString from 'query-string';

export const MAPPING = Object.freeze({
  [View.REDIRECT]: { path: '/' },

  [View.AUTHENTICATION]: { path: '/authentication' },
  [View.AUTHENTICATION_LOGIN]: { path: '/authentication/login' },
  [View.AUTHENTICATION_REGISTRATION]: { path: '/authentication/registration' },
  [View.AUTHENTICATION_FORGOT_PASSWORD]: { path: '/authentication/forgot-password' },
  [View.AUTHENTICATION_RESET_PASSWORD]: { path: '/authentication/reset-password' },

  [View.USER]: { path: '/user' },
  [View.USER_CONTRACTS]: { path: '/user/contracts' },
  [View.USER_INVESTMENT]: { path: '/user/investment' },
  [View.USER_PARTNERS]: { path: '/user/partners' },
  [View.USER_HISTORY]: { path: '/user/history' },
  [View.USER_PROFILE]: { path: '/user/profile' },

  [View.ERROR]: { path: '/error' },
  [View.ERROR_404]: { path: '/error/404' },
}) as CombinedRoutes;

export const getPath = (view: (typeof View)[keyof typeof View]) => (MAPPING[view] ? MAPPING[view].path : '');

export const injectPathParams = (route: string, params: any) => {
  let newRoute = route;

  if (params['*']) {
    delete params['*'];
  }

  Object.keys(params).forEach(function (key, index) {
    const regex = new RegExp(`:${key}`, 'g');
    newRoute = newRoute.replace(regex, params[key]);
  });

  return newRoute as any;
};

export const constructPath = ({
  view,
  params,
  queryParams,
}: {
  view: (typeof View)[keyof typeof View];
  params?: PathParams;
  queryParams?: QueryParams;
}): string => {
  const pathRaw = MAPPING[view] ? MAPPING[view].path : '';

  const pathWithParams = !isEmpty(params) ? injectPathParams(pathRaw, params) : pathRaw;

  const pathWithSearch =
    queryParams && !isEmpty(queryParams)
      ? queryString.stringifyUrl({ url: pathWithParams, query: queryParams })
      : pathWithParams;
  return pathWithSearch;
};

export const PATHS = Object.keys(View)
  .map((key) => ({
    [key]: getPath((View as any)[key]),
  }))
  .reduce(
    (obj, item) => ({
      ...obj,
      [Object.keys(item)[0]]: item[Object.keys(item)[0]],
    }),
    {},
  ) as CombinedRoutes;

export const VIEW_PATH_PAIRS = Object.keys(MAPPING).map((key) => ({
  view: key as (typeof View)[keyof typeof View],
  path: getPath(key as (typeof View)[keyof typeof View]) as string,
}));
