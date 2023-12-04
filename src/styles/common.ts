import styled from '@emotion/styled';
import { media } from './media';

export const AuthenticationWrapper = styled.div`
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 86px;
  gap: 20px;

  /* ${media.phone`
    padding: 0 20px;
  `} */
`;
