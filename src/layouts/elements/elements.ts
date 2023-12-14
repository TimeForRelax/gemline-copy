import styled from '@emotion/styled';
import { media } from '@styles/index';

export const Wrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  max-width: 1440px;
  padding: 0 40px;

  ${media.tablet} {
    padding: 0 30px;
  }

  ${media.phone} {
    padding: 0 16px;
  }
`;

export const SideBarWrapper = styled.div<{ widthWindow: number }>`
  width: 280px;
  padding-right: 20px;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 50%;
  transform: ${({ widthWindow }) => `translateX(calc(-${widthWindow / 2}px + 40px))`};
  overflow-y: auto;

  ${media.tablet} {
    width: 100%;
    height: max-content;
    transform: translateX(0);
    top: initial;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 30px;

    border-top: 1px solid #474a53;
    background: #383c48;
  }

  ${media.phone} {
    padding: 0 16px;
  }
`;

export const Body = styled.div<{ paddingTop: number; paddingBottom: number }>`
  margin-left: 260px;
  padding-left: 40px;
  min-height: 100vh;

  ${media.tablet} {
    margin-left: 0;
    padding: ${({ paddingTop, paddingBottom }) => `${paddingTop}px 0 ${paddingBottom}px 0`};
    min-height: 100vh;
  }
`;
