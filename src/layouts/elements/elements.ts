import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isauth?: boolean }>`
  // @TODO use react-div-100vh
  min-height: 200vh;
  // @TODO try not to use 100% and flex in the same html element
  width: 100%;
  max-width: 1440px;
  position: relative;
`;

export const SideBarWrapper = styled.div`
  background-color: yellow;
  height: 100%;
  position: fixed;
  width: 260px;
  top: 0;
  left: 50%;
  transform: translateX(-740px);
`;

export const Body = styled.div`
  background-color: purple;
  height: 100%;
  padding-left: 300px;
`;
