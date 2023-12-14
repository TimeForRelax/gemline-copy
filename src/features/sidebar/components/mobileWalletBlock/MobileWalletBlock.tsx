import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { FC } from 'react';
import { colorFetch, theme } from '@styles/index';

import { ReactComponent as Logo } from '@assets/images/sidebar/balance/mobile_logo.svg';
import { ReactComponent as Arrow } from '@assets/images/sidebar/balance/arrow.svg';

const Wrapper = styled.div`
  border-bottom: 1px solid #474a53;
  background: #383c48;
  padding: 12px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BalanceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.span`
  font-family: 'Nunito400';
  font-size: 16px;
  color: ${colorFetch('gray1')({ theme })};
`;

const Balance = styled.span`
  font-family: 'Nunito700';
  font-size: 20px;
  color: ${colorFetch('white')({ theme })};
`;

const StyledButton = styled(Button) <{ backgroundColor: string; backgroundColorHovered: string }>`
  font-family: 'Nunito600';
  font-size: 14px;
  letter-spacing: normal;
  text-transform: none;
  background-color: ${({ backgroundColor }) => colorFetch(backgroundColor)({ theme })};

  &:hover {
    background-color: ${({ backgroundColorHovered }) => backgroundColorHovered};
  }
`;

interface MobileWalletBlockProps {
  balanceRef: (node: HTMLElement | null) => void;
}

export const MobileWalletBlock: FC<MobileWalletBlockProps> = ({ balanceRef }) => {
  const handleBalanceClick = () => { };

  return (
    <Wrapper ref={balanceRef}>
      <BalanceInfo>
        <Logo />
        <TextInfo>
          <Name>Константин Вершигора</Name>
          <Balance>2 899 USDT</Balance>
        </TextInfo>
      </BalanceInfo>
      <StyledButton
        onClick={handleBalanceClick}
        backgroundColor={'green'}
        backgroundColorHovered={'#48D88A'}
        variant="contained"
        endIcon={<Arrow />}
      >
        Баланс
      </StyledButton>
    </Wrapper>
  );
};
