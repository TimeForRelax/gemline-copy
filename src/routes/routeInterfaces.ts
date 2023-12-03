import { AuthenticationView, ErrorView, GeneralView, UserView } from '@enums/index';

export const View = {
  ...GeneralView,
  ...AuthenticationView,
  ...UserView,
  ...ErrorView,
};

export type View = typeof View;

export type CombinedRoutes = {
  [key in keyof View]: any;
};

export type GeneralRoutes = {
  [key in keyof GeneralView]: any;
};

export type AuthenticationRoutes = {
  [key in AuthenticationView]: any;
};

export type UserRoutes = {
  [key in UserView]: any;
};

export type ErrorRoutes = {
  [key in ErrorView]: any;
};
