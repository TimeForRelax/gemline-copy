import styled from '@emotion/styled';
import { colorFetch, theme } from '@styles/index';
import { FC } from 'react';
import { Button } from '@mui/material';

import { ReactComponent as BalanceIcon } from '@assets/images/sidebar/balance/balance.svg';

const Wrapper = styled.div`
  padding: 20px 30px;
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-gap: 16px 12px;
  border-radius: 12px;
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-family: 'Nunito400';
  font-size: 16px;
  color: ${colorFetch('gray1')({ theme })};
`;

const Balance = styled.span`
  font-family: 'Nunito700';
  font-size: 20px;
  color: ${colorFetch('white')({ theme })};
`;

const ButtonsWrapper = styled.div`
  grid-area: 2/1/2 / span 2;
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Button) <{ backgroundColor: string; backgroundColorHovered: string }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Nunito600';
  font-size: 14px;
  letter-spacing: normal;
  text-transform: none;
  background-color: ${({ backgroundColor }) => colorFetch(backgroundColor)({ theme })};

  &:hover {
    background-color: ${({ backgroundColorHovered }) => backgroundColorHovered};
  }
`;

interface WalletBlockProps { }

export const WalletBlock: FC<WalletBlockProps> = ({ ...props }) => {
  const handleWithdraw = () => { };

  const handleTopUp = () => { };

  return (
    <Wrapper {...props}>
      <BalanceIcon />
      <TextInfo>
        <Label>Баланс</Label>
        <Balance>2 888 USDT</Balance>
      </TextInfo>
      <ButtonsWrapper>
        <StyledButton
          onClick={handleWithdraw}
          backgroundColor={'red'}
          backgroundColorHovered={'#FA707C'}
          variant="contained"
        >
          Вывести
        </StyledButton>
        <StyledButton
          onClick={handleTopUp}
          backgroundColor={'green'}
          backgroundColorHovered={'#48D88A'}
          variant="contained"
        >
          Пополнить
        </StyledButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};
