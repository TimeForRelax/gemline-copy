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
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Wrapper>
        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
        <Body>{renderRoutes(routes, parentPathLength)}</Body>
      </Wrapper>
    </div>
  );
};
