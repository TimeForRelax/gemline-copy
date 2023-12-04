import {
  Contracts,
  Error404,
  ForgotPassword,
  ResetPassword,
  History,
  Investment,
  Login,
  Partners,
  Profile,
  Registration,
} from '@containers/index';
import { WithAuth } from '@features/index';
import { AuthenticationLayout, ErrorsLayout, UserLayout } from '@layouts/index';
import { PATHS } from '@routes/paths';
import { UserSwitcher } from '@routes/UserSwitcher';

export const routes = [
  {
    path: PATHS.AUTHENTICATION,
    render: ({ ...props }: any) => <AuthenticationLayout {...props} />,
    routes: [
      {
        path: PATHS.AUTHENTICATION_LOGIN,
        component: <Login />,
      },
      {
        path: PATHS.AUTHENTICATION_REGISTRATION,
        component: <Registration />,
      },
      {
        path: PATHS.AUTHENTICATION_FORGOT_PASSWORD,
        component: <ForgotPassword />,
      },
      {
        path: PATHS.AUTHENTICATION_RESET_PASSWORD,
        component: <ResetPassword />,
      },
    ],
  },
  {
    path: PATHS.USER,
    render: ({ ...props }: any) => (
      <WithAuth>
        <UserLayout {...props} />
      </WithAuth>
    ),
    routes: [
      {
        path: PATHS.USER_PROFILE,
        component: <Profile />,
      },
      {
        path: PATHS.USER_CONTRACTS,
        component: <Contracts />,
      },
      {
        path: PATHS.USER_INVESTMENT,
        component: <Investment />,
      },
      {
        path: PATHS.USER_PARTNERS,
        component: <Partners />,
      },
      {
        path: PATHS.USER_HISTORY,
        component: <History />,
      },
    ],
  },
  {
    path: PATHS.ERROR,
    render: ({ ...props }: any) => <ErrorsLayout {...props} />,
    routes: [{ path: PATHS.ERROR_404, component: <Error404 /> }],
  },
  {
    path: PATHS.REDIRECT,
    component: <UserSwitcher />,
  },
];
