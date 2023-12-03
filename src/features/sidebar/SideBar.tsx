import { FC } from 'react';
import styled from '@emotion/styled';
import { LogoBlock } from './components/logoBlock/LogoBlock';
import { NavigationBlock } from './components/navigationBlock/NavigationBlock';
import { ProfileBlock } from './components/profileBlock/ProfileBlock';
import { WalletBlock } from './components/walletBlock/WalletBlock';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
  return (
    <Wrapper>
      <LogoBlock />
      <NavigationBlock />
      <ProfileBlock />
      <WalletBlock />
    </Wrapper>
  );
};
