import { FC } from 'react';
import styled from '@emotion/styled';
import { media } from '@styles/media';

const Wrapper = styled.div`
  ${media.tablet`
    display: none;
  `}
`;

interface ContractsProps {}

export const Contracts: FC<ContractsProps> = () => {
  return <Wrapper>CONTRACTS</Wrapper>;
};
