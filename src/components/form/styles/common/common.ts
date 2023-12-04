import { Box, Button, Link, Typography } from '@mui/material';
import { theme, colorFetch } from '@styles/index';
import styled from '@emotion/styled';

export const AuthFormsBox = styled(Box)`
  padding-top: 50px;
  margin: auto;
  width: 100%;
  max-width: 435px;
  height: max-content;
  flex: 1 0 auto;
  overflow-y: auto;
`;

export const FormsHeading = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  text-align: center;
  font-family: Nunito800;
  font-size: 42px;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 30px;
`;

export const FormsSubHeading = styled(Typography)`
  color: ${colorFetch('light_grey')({ theme })};
  text-align: center;
  font-family: Nunito600;
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
`;

export const FormsSubmitButton = styled(Button)`
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

export const FormLink = styled(Link)`
  color: ${colorFetch('green')({ theme })};
  font-family: Nunito400;
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
  color: ${colorFetch('light_grey')({ theme })};
  font-family: Nunito400;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;
