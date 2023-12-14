import { ModalContentBox, ModalContentHeader } from '@components/modal/StyledModal';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { colorFetch, theme } from '@styles/index';

export const DrawerContentHeader = styled(ModalContentHeader)`
  padding: 0 0 20px 0;
`;

export const DrawerContentBox = styled(ModalContentBox)`
  padding: 0;
`;

export const ModalContentPackageBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const DrawerContentPackageBox = styled(ModalContentPackageBox)`
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;
`;

export const ModalContentPackageBtns = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const DrawerContentPackageBtns = styled(Box)`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
`;

export const ModalInvestButton = styled(Button)`
  width: 100%;
  padding: 16px 32px;
  border-radius: 8px;
  background: ${colorFetch('green')({ theme })};
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-transform: initial;
  box-shadow: none;

  &:hover {
    background-color: ${colorFetch('light_green_hover')({ theme })};
    box-shadow: none;
  }
`;

export const CloseButton = styled(ModalInvestButton)`
  background: ${colorFetch('close_btn_gray')({ theme })};

  &:hover {
    background-color: ${colorFetch('close_btn_hover_gray')({ theme })};
  }
`;

export const SuccessModalText = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito600;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;
