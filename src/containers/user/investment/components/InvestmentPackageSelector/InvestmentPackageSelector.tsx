import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media, theme } from '@styles/index';
import { FC, useState } from 'react';
import { InvestmentForm, SelectPackage } from './components/index';

const InvestmentPackageSelectorBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 50px;

  ${media.tabletPro} {
    flex-direction: column;
  }

  ${media.tablet} {
    margin-bottom: 10px;
  }
`;

const InvestBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 340px;
  height: 170px;
  flex-shrink: 0;
  padding: 30px;
  border-radius: 12px;
  border-left: 4px solid ${colorFetch('green')({ theme })};
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px ${colorFetch('shadow_gray')({ theme })} inset;

  ${media.phone} {
    width: 100%;
  }
`;

const InvestBoxHeading = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;

  ${media.phone} {
    font-size: 16px;
  }
`;

interface InvestmentPackageSelectorProps {}

export const InvestmentPackageSelector: FC<InvestmentPackageSelectorProps> = () => {
  const [isDisabledPackages, setIsDisabledPackages] = useState<boolean>(false);

  return (
    <InvestmentPackageSelectorBox>
      <InvestBox>
        <InvestBoxHeading>Введите сумму инвестиции</InvestBoxHeading>
        <InvestmentForm />
      </InvestBox>
      <SelectPackage disabled={isDisabledPackages} />
    </InvestmentPackageSelectorBox>
  );
};
