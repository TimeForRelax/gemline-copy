import { Buttons, ResponsiveModal } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes, ModalsTypes } from '@enums/index';
import { Modals } from '@features/index';
import { colorFetch } from '@styles/index';
import { FC, useState } from 'react';

import { ReactComponent as BalanceIcon } from '@assets/images/sidebar/balance/balance.svg';
import { useGlobalState } from 'src/globalContext';

const Wrapper = styled.div`
  padding: 20px 30px;
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-gap: 16px 12px;
  border-radius: 12px;
  background: ${colorFetch('white')};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-family: 'Gilroy500';
  font-size: 16px;
  color: ${colorFetch('gray1')};
`;

const Balance = styled.span`
  font-family: 'Gilroy700';
  font-size: 20px;
  color: ${colorFetch('black')};
`;

const ButtonsWrapper = styled.div`
  grid-area: 2/1/2 / span 2;
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Buttons)`
  padding: 8px 12px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface WalletBlockProps {
  openWithdraw: () => void;
}

export const WalletBlock: FC<WalletBlockProps> = ({ openWithdraw, ...props }) => {
  const { balance } = useGlobalState();

  const [isOpenTopUp, setIsOpenTopUp] = useState<boolean>(false);

  const handleTopUp = () => {
    setIsOpenTopUp(true);
  };

  const onClose = () => {
    setIsOpenTopUp(false);
  };

  return (
    <>
      <Wrapper {...props}>
        <BalanceIcon />
        <TextInfo>
          <Label>Баланс</Label>
          <Balance>{balance} $</Balance>
        </TextInfo>
        <ButtonsWrapper>
          <StyledButton buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={openWithdraw}>
            Вывести
          </StyledButton>
          <StyledButton buttonType={ButtonsTypes.CONTAINED_GREEN} onClick={handleTopUp}>
            Пополнить
          </StyledButton>
        </ButtonsWrapper>
      </Wrapper>
      <ResponsiveModal isOpen={isOpenTopUp} onClose={onClose}>
        <Modals type={ModalsTypes.REPLENISH_ACCOUNT} onClose={onClose} />
      </ResponsiveModal>
    </>
  );
};
