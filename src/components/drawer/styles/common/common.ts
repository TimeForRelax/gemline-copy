import styled from '@emotion/styled';
import { Drawer, Typography } from '@mui/material';
import { colorFetch } from '@styles/index';

export const StyledDrawerBox = styled(Drawer)`
  border-radius: 20px 20px 0px 0px;

  .MuiDrawer-paper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 35px 20px;
    border-radius: 20px 20px 0px 0px;
    background: ${colorFetch('white')};
    max-height: 85vh;

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
      background-color: ${colorFetch('gray4')};
    }
  }

  &.without-padding {
    .MuiDrawer-paper {
      padding: 35px 0;
    }
  }
`;

export const DrawerHeading = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

export const DrawerContentText = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
