import { Buttons, ResponsiveModal } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes, ModalsTypes } from '@enums/index';
import { Modals } from '@features/index';
import { colorFetch } from '@styles/index';
import { useBlockBodyScroll } from '@utils/index';
import { FC, useState } from 'react';
import { useGlobalState } from 'src/globalContext';

import { ReactComponent as Arrow } from '@assets/images/common/arrow.svg';
import { ReactComponent as Logo } from '@assets/images/sidebar/balance/mobile_logo.svg';
import { LANDING_URL } from 'src/consts';

const Wrapper = styled.div`
  position: relative;
  border-bottom: 1px solid ${colorFetch('border')};
  background-color: ${colorFetch('white')};
  padding: 12px;
  position: fixed;
  z-index: 1200;
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
  font-family: 'Gilroy500';
  font-size: 16px;
  color: ${colorFetch('gray1')};
`;

const Balance = styled.span`
  font-family: 'Gilroy700';
  font-size: 20px;
  color: ${colorFetch('black')};
`;

const StyledButtons = styled(Buttons)`
  width: max-content;
  padding: 8px 12px;
`;

const ButtonText = styled.span``;

const CustomSlide = styled.div<{ heightOfBlock?: number }>`
  background-color: ${colorFetch('white')};
  padding: 20px 20px 40px;
  border-radius: 0 0 20px 20px;

  position: fixed;
  z-index: 1100;
  top: ${({ heightOfBlock }) => heightOfBlock + 'px'};
  left: 0;
  right: 0;
  transform: translateY(-110%);
  transition: all 0.2s linear;

  display: flex;
  flex-direction: column;
  gap: 10px;

  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 5px;
    border-radius: 999px;
    background-color: ${colorFetch('gray4')};
  }

  &.open {
    transform: translateY(0);
  }
`;

const BackgroundSlide = styled.div`
  background-color: rgba(45, 48, 59, 0.8);
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.2s linear;
  pointer-events: none;
  opacity: 0;

  &.open {
    pointer-events: auto;
    opacity: 1;
  }
`;

const StyledSlideButtons = styled(Buttons)`
  padding: 16px 32px;
`;

interface MobileWalletBlockProps {
  heightOfBlock?: number;
  balanceRef: (node: HTMLElement | null) => void;
}

export const MobileWalletBlock: FC<MobileWalletBlockProps> = ({ balanceRef, heightOfBlock }) => {
  const { balance, userName } = useGlobalState();

  const [isOpenTopUp, setIsOpenTopUp] = useState<boolean>(false);

  const [isOpenWithdraw, setIsOpenWithdraw] = useState<boolean>(false);
  const [isOpenWithdrawSuccess, setIsOpenWithdrawSuccess] = useState<boolean>(false);

  const [isOpenSlide, setIsOpenSlide] = useState(false);

  const handleBalanceClick = () => {
    setIsOpenSlide((prev) => !prev);
  };

  const handleTopUp = () => {
    setIsOpenSlide(false);
    setIsOpenTopUp(true);
  };

  const onCloseTopUp = () => {
    setIsOpenTopUp(false);
  };

  useBlockBodyScroll(isOpenSlide);

  const openWithdraw = () => {
    setIsOpenSlide(false);
    setIsOpenWithdraw(true);
  };

  const closeWithdraw = () => {
    setIsOpenWithdraw(false);
  };
  const openWithdrawSuccess = () => {
    setIsOpenWithdrawSuccess(true);
  };

  const closeWithdrawSuccess = () => {
    setIsOpenWithdrawSuccess(false);
  };

  const handleLogo = () => {
    window.location.href = LANDING_URL;
  };

  return (
    <>
      <Wrapper ref={balanceRef}>
        <BalanceInfo>
          <Logo onClick={handleLogo} />
          <TextInfo>
            <Name>{userName}</Name>
            <Balance>{balance} $</Balance>
          </TextInfo>
        </BalanceInfo>

        <StyledButtons onClick={handleBalanceClick} buttonType={ButtonsTypes.CONTAINED_GREEN} endIcon={<Arrow />}>
          <ButtonText>Баланс</ButtonText>
        </StyledButtons>
      </Wrapper>
      <CustomSlide className={isOpenSlide && 'open'} heightOfBlock={heightOfBlock}>
        <StyledSlideButtons onClick={openWithdraw} buttonType={ButtonsTypes.CONTAINED_GRAY}>
          Вывести
        </StyledSlideButtons>
        <StyledSlideButtons onClick={handleTopUp} buttonType={ButtonsTypes.CONTAINED_GREEN}>
          Пополнить
        </StyledSlideButtons>
      </CustomSlide>

      <BackgroundSlide className={isOpenSlide && 'open'} onClick={handleBalanceClick}></BackgroundSlide>

      <ResponsiveModal isOpen={isOpenTopUp} onClose={onCloseTopUp}>
        <Modals type={ModalsTypes.REPLENISH_ACCOUNT} onClose={onCloseTopUp} />
      </ResponsiveModal>

      <ResponsiveModal isOpen={isOpenWithdraw} onClose={closeWithdraw}>
        <Modals type={ModalsTypes.WITHDRAW} onClose={closeWithdraw} otherProps={{ openWithdrawSuccess }} />
      </ResponsiveModal>

      <ResponsiveModal isOpen={isOpenWithdrawSuccess} onClose={closeWithdrawSuccess}>
        <Modals type={ModalsTypes.WITHDRAW_SUCCESS} onClose={closeWithdrawSuccess} />
      </ResponsiveModal>
    </>
  );
};
