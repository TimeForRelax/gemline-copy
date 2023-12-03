import { FC } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  border-radius: 12px;
  background: #474a53;
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
`;

interface WalletBlockProps {}

export const WalletBlock: FC<WalletBlockProps> = () => {
  return <Wrapper></Wrapper>;
};
