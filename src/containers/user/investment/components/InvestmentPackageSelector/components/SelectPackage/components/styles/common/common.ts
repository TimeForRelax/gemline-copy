import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';

export const DrawerContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 20px 0;

  &.with-padding {
    padding: 0 0 0 20px;
    border: none;
  }
`;

export const DrawerContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;
  height: 100%;
  max-height: 85vh;
  overflow: auto;

  /* &.without-padding {
    padding: 0 0 30px 0;
  } */
`;

export const StyledInvestButton = styled(Buttons)`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  padding: 18px 32px;

  ${media.phone} {
    padding: 14px 32px;
  }
`;

export const ModalContentPackageBox = styled(Box)`
  display: grid;
  grid-template-columns: 0.7fr 1fr 0.5fr;
  padding: 0 30px 0 30px;
`;

export const SelectPckgItemBox = styled(Box)`
  padding: 20px 30px;
  background-color: ${colorFetch('background')};

  ${media.phone} {
    padding: 20px;
  }
`;

export const DrawerContentPackageBox = styled(ModalContentPackageBox)`
  grid-template-columns: 0.7fr 1fr 0.5fr;
  gap: 30px 20px;

  ${media.phone} {
    padding: 0 20px;
    gap: 30px 12px;
  }
`;

export const ModalContentPackageBtns = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 30px;
`;

export const DrawerContentPackageBtns = styled(Box)`
  padding: 0 20px;
`;

export const ModalInvestButton = styled(Button)`
  width: 100%;
  padding: 16px 32px;
  border-radius: 8px;
  background: ${colorFetch('green')};
  color: ${colorFetch('white')};
  font-family: Gilroy600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-transform: initial;
  box-shadow: none;

  &:hover {
    background-color: ${colorFetch('light_green_hover')};
    box-shadow: none;
  }
`;

export const SuccessModalText = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding: 0 30px;

  ${media.phone} {
    padding: 0 20px;
  }
`;
