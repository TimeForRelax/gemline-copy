import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { media, useMediaType } from '@styles/index';
import { FC } from 'react';
import {
  ActivePackage,
  ActivePackageMobile,
  InvestmentInfoAccordion,
  InvestmentInfoAccordionMobile,
  PromoPackageStatus,
  TableHeading,
} from './components/index';
import { data } from './data/data';

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

console.log(media.tabletPro);

interface PackagesInfoProps {}

export const PackagesInfo: FC<PackagesInfoProps> = () => {
  const { tabletPro, phone } = useMediaType();
  return (
    <PackagesInfoBox>
      {!tabletPro ? (
        <>
          <TableHeading />
          <ActivePackage />
        </>
      ) : (
        <ActivePackageMobile />
      )}
      <PromoPackageStatus />
      {data.map(({ id, period, closedValues, openedValues }: any) => {
        if (!phone) {
          return (
            <InvestmentInfoAccordion
              id={id}
              period={period}
              closedValues={closedValues}
              openedValues={openedValues}
              key={id}
            />
          );
        } else {
          return (
            <InvestmentInfoAccordionMobile
              id={id}
              period={period}
              closedValues={closedValues}
              openedValues={openedValues}
              key={id}
            />
          );
        }
      })}
    </PackagesInfoBox>
  );
};
