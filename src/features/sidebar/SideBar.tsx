import styled from '@emotion/styled';
import { media, useMediaType } from '@styles/index';
import { FC } from 'react';
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

interface SideBarProps { }

export const SideBar: FC<SideBarProps> = () => {
  const { tablet } = useMediaType();

  return (
    <Wrapper>
      {tablet ? (
        <MobileNavigationBlock />
      ) : (
        <>
          <LogoBlock />
          <NavigationBlock />
          <ProfileBlock />
          <WalletBlock />
        </>
      )}
    </Wrapper>
  );
};
