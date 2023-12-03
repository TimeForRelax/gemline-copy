import { FC, ReactNode } from 'react';

interface WithAuthProps {
  children: ReactNode;
}

export const WithAuth: FC<WithAuthProps> = ({ children }) => {
  // some logic

  return <>{children}</>;
};
