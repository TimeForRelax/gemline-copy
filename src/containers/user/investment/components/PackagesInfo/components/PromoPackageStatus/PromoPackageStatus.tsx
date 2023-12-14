import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media, theme } from '@styles/index';
import { FC } from 'react';
import { Timer } from './Timer/Timer';

const PromoPackageStatusBox = styled(Box)`
  min-height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-radius: 12px;
  border: 1px solid ${colorFetch('green')({ theme })};
  gap: 12px;

  ${media.tabletPro} {
    flex-direction: column;
    padding: 20px;
  }

  ${media.phone} {
    padding: 20px;
  }
`;

const PromoPackageStatusBoxText = styled(Typography)`
  width: 100%;
  color: ${colorFetch('silver_chalice')({ theme })};
  font-family: Nunito700;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  text-align: start;

  ${media.phone} {
    font-size: 16px;
    line-height: 22px;
  }
`;

interface PromoPackageStatusProps {}

export const PromoPackageStatus: FC<PromoPackageStatusProps> = () => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 5);

  const targetDate = currentDate.toISOString();

  console.log(targetDate);

  return (
    <PromoPackageStatusBox>
      <PromoPackageStatusBoxText>До окончания действия пакета «Промо» осталось:</PromoPackageStatusBoxText>
      <Timer targetDate={targetDate} />
    </PromoPackageStatusBox>
  );
};
