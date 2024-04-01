import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FC } from 'react';
import { Timer } from './Timer/Timer';
dayjs.extend(duration);

const PromoPackageStatusBox = styled(Box)`
  min-height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-radius: 24px;
  border: 1px solid ${colorFetch('green')};
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
  color: ${colorFetch('green')};
  font-family: Gilroy700;
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
  return (
    <PromoPackageStatusBox>
      <PromoPackageStatusBoxText>До окончания действия пакета «Промо» осталось:</PromoPackageStatusBoxText>
      <Timer />
    </PromoPackageStatusBox>
  );
};
