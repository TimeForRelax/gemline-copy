import { media } from '@styles/media';
import styled from 'styled-components';

export const Wrapper = styled.div<{ isAuth?: boolean }>`
  height: 100%;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: ${({ isAuth }) => (isAuth ? '1fr' : '260px 1fr')};
  gap: 40px;
  overflow: hidden;

  ${media.tablet`
    padding: 0 20px
  `}
`;

export const SideBarWrapper = styled.div`
  background-color: yellow;
  height: 100%;
  overflow-y: auto;
`;

export const Body = styled.div`
  background-color: purple;
  height: 100%;
  overflow-y: auto;
`;
