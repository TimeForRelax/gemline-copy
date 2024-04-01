import styled from '@emotion/styled';
import { Box, Button, Link, Typography } from '@mui/material';
import { colorFetch } from '@styles/index';

export const AuthFormsBox = styled(Box)`
  padding: 40px 0;
  margin: auto;
  width: 100%;
  max-width: 435px;
  flex: 1 0 auto;
`;

export const FormsHeading = styled(Typography)`
  color: ${colorFetch('white')};
  text-align: center;
  font-family: Gilroy700;
  font-size: 42px;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 30px;
`;

export const FormsSubHeading = styled(Typography)`
  color: ${colorFetch('gray1')};
  text-align: center;
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 30px;
`;

export const FormsFieldsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  &.login_fields {
    margin-bottom: 12px;
  }
`;

export const FormsSubmitButton = styled(Button)`
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

export const FormLink = styled(Link)`
  color: ${colorFetch('green')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;

export const FormsFooterBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;

export const FormsFooterText = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;
