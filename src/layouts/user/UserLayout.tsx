import { SideBar } from '@features/index';
import { Body, SideBarWrapper, Wrapper } from '@layouts/elements/elements';
import { renderRoutes } from '@utils/index';
import { FC } from 'react';

interface UserLayoutProps {
  routes: any;
  parentPathLength: number;
}

export const UserLayout: FC<UserLayoutProps> = ({ routes, parentPathLength }) => {
  return (
    <Wrapper>
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>
      <Body>{renderRoutes(routes, parentPathLength)}</Body>
    </Wrapper>
  );
};
