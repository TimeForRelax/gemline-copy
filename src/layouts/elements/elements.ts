import styled from '@emotion/styled';

export const Wrapper = styled.div<{ isauth?: boolean }>`
  max-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: ${({ isauth }) => (isauth ? '1fr' : '260px 1fr')};
  gap: 40px;
  overflow: hidden;
`;

export const SideBarWrapper = styled.div`
  /* background-color: yellow; */
  height: 100%;
  /* overflow-y: auto; */
`;

export const Body = styled.div`
  /* background-color: purple; */
  height: 100%;
  /* overflow-y: auto; */
`;
