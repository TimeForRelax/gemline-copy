import { ResponsiveModal } from '@components/index';
import styled from '@emotion/styled';
import { ModalsTypes } from '@enums/index';
import { Modals } from '@features/modals/Modals';
import { getPath, View } from '@routes/index';
import { media, useMediaType } from '@styles/index';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoBlock } from './components/logoBlock/LogoBlock';
import { MobileNavigationBlock } from './components/mobileNavigationBlock/MobileNavigationBlock';
import { NavigationBlock } from './components/navigationBlock/NavigationBlock';
import { ProfileBlock } from './components/profileBlock/ProfileBlock';
import { WalletBlock } from './components/walletBlock/WalletBlock';

const Wrapper = styled.div`
  padding: 40px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  ${media.tablet} {
    padding: 12px 0 32px 0;
  }
`;

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
  const { tablet } = useMediaType();
  const navigate = useNavigate();

  const [isOpenWithdraw, setIsOpenWithdraw] = useState<boolean>(false);
  const [isOpenWithdrawVerification, setIsOpenWithdrawVerification] = useState<boolean>(false);
  const [isOpenWithdrawSuccess, setIsOpenWithdrawSuccess] = useState<boolean>(false);
  const [isOpenWithdrawVerificationSuccess, setIsOpenWithdrawVerificationSuccess] = useState<boolean>(false);

  const openWithdraw = () => {
    setIsOpenWithdraw(true);
  };

  const closeWithdraw = () => {
    setIsOpenWithdraw(false);
  };

  const closeWithdrawVerification = () => {
    setIsOpenWithdrawVerification(false);
  };

  const openWithdrawSuccess = () => {
    setIsOpenWithdrawSuccess(true);
  };

  const closeWithdrawSuccess = () => {
    setIsOpenWithdrawSuccess(false);
  };

  const closeWithdrawVerificationSuccess = () => {
    setIsOpenWithdrawVerificationSuccess(false);
    navigate(getPath(View.USER_INVESTMENT));
  };

  return (
    <Wrapper>
      {tablet ? (
        <MobileNavigationBlock />
      ) : (
        <>
          <LogoBlock />
          <NavigationBlock />
          <ProfileBlock />
          <WalletBlock openWithdraw={openWithdraw} />
        </>
      )}
      <ResponsiveModal isOpen={isOpenWithdraw} onClose={closeWithdraw}>
        <Modals type={ModalsTypes.WITHDRAW} onClose={closeWithdraw} otherProps={{ openWithdrawSuccess }} />
      </ResponsiveModal>
      <ResponsiveModal isOpen={isOpenWithdrawSuccess} onClose={closeWithdrawSuccess}>
        <Modals type={ModalsTypes.WITHDRAW_SUCCESS} onClose={closeWithdrawSuccess} />
      </ResponsiveModal>
      <ResponsiveModal isOpen={isOpenWithdrawVerification} onClose={closeWithdrawVerification}>
        <Modals type={ModalsTypes.WITHDRAW_VERIFICATION} onClose={closeWithdrawVerification} />
      </ResponsiveModal>
      <ResponsiveModal isOpen={isOpenWithdrawVerificationSuccess} onClose={closeWithdrawVerificationSuccess}>
        <Modals type={ModalsTypes.WITHDRAW_VERIFICATION_SUCCESS} onClose={closeWithdrawVerificationSuccess} />
      </ResponsiveModal>
    </Wrapper>
  );
};
