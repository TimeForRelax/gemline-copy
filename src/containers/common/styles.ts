import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled(Box)`
  width: 100%;
  flex: 1;
  padding: 40px 0;

  ${media.phone} {
    padding: 30px 0;
  }
`;

export const Heading = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: normal;
  margin-top: 22px;
  height: 94px;
  width: max-content;

  ${media.phone} {
    height: auto;
    margin-top: 0;
    font-size: 24px;
    margin-bottom: 30px;
  }
`;
