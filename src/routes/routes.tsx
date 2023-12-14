import { Contracts, Error404, History, Investment, Partners, Profile } from '@containers/index';
import { WithAuth } from '@features/index';
import { ErrorsLayout, UserLayout } from '@layouts/index';
import { PATHS } from '@routes/paths';
import { UserSwitcher } from '@routes/UserSwitcher';

export const routes = [
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
