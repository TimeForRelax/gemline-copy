import { FC, ReactNode, useState } from 'react';

interface WithAuthProps {
  children: ReactNode;
}

export const WithAuth: FC<WithAuthProps> = ({ children }) => {
  // Here we will check the auth. The auth will be built with token and refresh token through API.

  // Here we would normally make an API call to check the auth token
  // For example: const auth = api.checkAuthToken();
  // But for now, we will simulate this with a boolean
  const [auth, setAuth] = useState(false);

  // If the user is not authenticated, we could redirect them to a login page
  // For example: if (!auth) return <Redirect to="/login" />

  return <>{children}</>;
};
