import { Footer } from '@components/index';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { colorFetch, media, theme } from '@styles/index';
import { FC } from 'react';
import { InvestmentPackageSelector, PackagesInfo } from './components/index';

const Wrapper = styled(Box)``;

const ContentWrapper = styled(Box)`
  padding: 40px 0;

  ${media.phone} {
    padding: 30px 0;
  }
`;

const Heading = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 42px;
  width: max-content;

  ${media.phone} {
    font-size: 24px;
    margin-bottom: 30px;
  }
`;

const HeadingBottom = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 30px;

  ${media.phone} {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

export const ActivePckgBoxText = styled(Typography)`
  align-self: center;
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
`;

interface InvestmentProps {}

export const Investment: FC<InvestmentProps> = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Инвестиции</Heading>
        <PackagesInfo />
        <HeadingBottom>Инвестиции</HeadingBottom>
        <InvestmentPackageSelector />
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
