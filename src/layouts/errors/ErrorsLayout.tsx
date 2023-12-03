import { SideBar } from '@features/index';
import { Body, SideBarWrapper, Wrapper } from '@layouts/elements/elements';
import { renderRoutes } from '@utils/renderRoutes';
import { FC } from 'react';

interface ErrorsLayoutProps {
  routes: any;
  parentPathLength: number;
}

export const ErrorsLayout: FC<ErrorsLayoutProps> = ({ routes, parentPathLength }) => {
  return (
    <Wrapper>
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>
      <Body>{renderRoutes(routes, parentPathLength)}</Body>
    </Wrapper>
  );
};
