import { MobileWalletBlock, SideBar } from '@features/index';
import { Body, SideBarWrapper, Wrapper } from '@layouts/elements/elements';
import { useMediaType, useWindowSize } from '@styles/index';
import { renderRoutes } from '@utils/renderRoutes';
import { useCurrentView } from '@utils/useCurrentView';
import { FC, useCallback, useState } from 'react';
import { useViewMatch } from '@utils/index';
import { View } from '@routes/index';

interface ErrorsLayoutProps {
  routes: any;
  parentPathLength: number;
}

export const ErrorsLayout: FC<ErrorsLayoutProps> = ({ routes, parentPathLength }) => {
  const [width] = useWindowSize();
  const { tablet } = useMediaType();

  const [sideBarNode, setSideBarNode] = useState<HTMLElement | null>(null);
  const [balanceNode, setBalanceNode] = useState<HTMLElement | null>(null);

  const sideBarRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      setSideBarNode(node);
    }
  }, []);

  const balanceRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      setBalanceNode(node);
    }
  }, []);

  const matchPath = useViewMatch();

  const isError401: boolean = !!matchPath((View as any).ERROR_401);
  const isError500: boolean = !!matchPath((View as any).ERROR_500);

  const showSidebar = isError401 || isError500;

  return (
    <Wrapper>
      {!showSidebar && (
        <>
          <SideBarWrapper ref={sideBarRef} widthWindow={width > 1440 ? 1440 : width}>
            <SideBar />
          </SideBarWrapper>

          {tablet && <MobileWalletBlock balanceRef={balanceRef} />}
        </>
      )}
      <Body
        paddingTop={balanceNode?.getBoundingClientRect().height ?? 0}
        paddingBottom={sideBarNode?.getBoundingClientRect().height ?? 0}
        withoutSidebar={showSidebar}
      >
        {renderRoutes(routes, parentPathLength)}
      </Body>
    </Wrapper>
  );
};
