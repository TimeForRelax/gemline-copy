import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { media, useMediaType, colorFetch } from '@styles/index';
import { FC } from 'react';
import {
  ActivePackage,
  ActivePackageMobile,
  InvestmentInfoAccordion,
  InvestmentInfoAccordionMobile,
  PromoPackageStatus,
  TableHeading,
} from './components/index';

const PackagesInfoBox = styled(Box)`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 60px;

  ${media.tabletPro} {
    flex-direction: column;
  }
`;

export const ActivePckgBoxText = styled(Typography)`
  align-self: center;
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;

  &.package {
    color: ${colorFetch('white')};
  }

  &.period {
    color: ${colorFetch('gray1')};
  }
`;

interface PackagesInfoProps {
  data: any;
  isShowPromoInfo: boolean;
}

export const PackagesInfo: FC<PackagesInfoProps> = ({ data, isShowPromoInfo }) => {
  const { tabletPro, phone } = useMediaType();

  return (
    <PackagesInfoBox>
      {!tabletPro ? (
        <>
          <TableHeading />
          {isShowPromoInfo && <ActivePackage convertedPromoPackage={data?.convertedPromoPackage} />}
        </>
      ) : (
        <>{isShowPromoInfo && <ActivePackageMobile convertedPromoPackage={data?.convertedPromoPackage} />}</>
      )}
      {isShowPromoInfo && <PromoPackageStatus />}
      {data?.convertedData.map(({ id, period, closedValues, openedValues }: any) => {
        return !phone ? (
          <InvestmentInfoAccordion
            id={id}
            period={period}
            closedValues={closedValues}
            openedValues={openedValues}
            key={id}
          />
        ) : (
          <InvestmentInfoAccordionMobile
            id={id}
            period={period}
            closedValues={closedValues}
            openedValues={openedValues}
            key={id}
          />
        );
      })}
    </PackagesInfoBox>
  );
};
