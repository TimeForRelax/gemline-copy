import styled from '@emotion/styled';
import { Button, Drawer, Typography } from '@mui/material';
import { colorFetch, theme } from '@styles/index';

export const StyledDrawerBox = styled(Drawer)`
  border-radius: 20px 20px 0px 0px;

  .MuiDrawer-paper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 35px 20px;
    border-radius: 20px 20px 0px 0px;
    background: ${colorFetch('gray')({ theme })};
    max-height: 95vh;

    &::before {
      content: '';
      display: block;
      width: 100px;
      height: 5px;
      flex-shrink: 0;
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 100px;
      background-color: ${colorFetch('shuttle_gray')({ theme })};
    }
  }
`;

export const DrawerHeading = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

export const DrawerContentText = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito400;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

export const DrawerButton = styled(Button)`
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
