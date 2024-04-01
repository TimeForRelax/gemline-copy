import { useBalance } from '@api/index';
import { LoadingScreen, MobileWalletBlock, SideBar } from '@features/index';
import { Body, SideBarWrapper, Wrapper } from '@layouts/elements/elements';
import { useMediaType, useWindowSize } from '@styles/index';
import { renderRoutes } from '@utils/index';
import { FC, useCallback, useEffect, useState } from 'react';

const useOverflowHiddenObserver = (callback) => {
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const style = document.body.style;
          let isOverflowHidden =
            style.overflow === 'hidden' &&
            document.body.scrollHeight > window.innerHeight &&
            !window.navigator.userAgent.includes('Mac') &&
            document.body.classList.value !== 'custom-overflow';
          callback(isOverflowHidden);
        }
      }
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, [callback]);
};

interface UserLayoutProps {
  routes: any;
  parentPathLength: number;
}

export const UserLayout: FC<UserLayoutProps> = ({ routes, parentPathLength }) => {
  const [width] = useWindowSize();
  const { tablet } = useMediaType();

  const [showContent, setShowContent] = useState(false);
  const [isOverflowHidden, setIsOverflowHidden] = useState(false);

  const [sideBarNode, setSideBarNode] = useState<HTMLElement | null>(null);
  const [balanceNode, setBalanceNode] = useState<HTMLElement | null>(null);

  useOverflowHiddenObserver((value) => {
    if (value) {
      setIsOverflowHidden(true);
    } else {
      setIsOverflowHidden(false);
    }
  });

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

  useEffect(() => {
    setShowContent(true);
  }, []);

  return showContent ? (
    <Wrapper>
      <SideBarWrapper ref={sideBarRef} widthWindow={width > 1440 ? 1440 : width} isOverflowHidden={isOverflowHidden}>
        <SideBar />
      </SideBarWrapper>
      {tablet && (
        <MobileWalletBlock balanceRef={balanceRef} heightOfBlock={balanceNode?.getBoundingClientRect().height ?? 0} />
      )}
      <Body
        isOverflowHidden={isOverflowHidden}
        paddingTop={balanceNode?.getBoundingClientRect().height ?? 0}
        paddingBottom={sideBarNode?.getBoundingClientRect().height ?? 0}
      >
        {renderRoutes(routes, parentPathLength)}
      </Body>
    </Wrapper>
  ) : (
    <LoadingScreen />
  );
};
