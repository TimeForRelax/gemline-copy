import { CardColorBorder } from '@components/index';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';

const HistoryInfoBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  ${media.tablet} {
    gap: 15px;
  }

  ${media.phone} {
    margin-bottom: 30px;
  }
`;

const StyledCardColorBorder = styled(CardColorBorder)`
  padding: 20px 30px;
  flex-direction: column;
  gap: 6px;

  & p {
    align-self: flex-start;
  }
`;

const HistoryInfoHeading = styled(Typography)`
  color: ${colorFetch('gray')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  ${media.tablet} {
    font-size: 12px;
  }
`;

const HistoryInfoAmount = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 30px;
  font-weight: 700;
  line-height: normal;

  ${media.tablet} {
    font-size: 20px;
  }
`;

interface HistoryInfoProps {
  profit: Record<string, string>;
}

export const HistoryInfo: FC<HistoryInfoProps> = ({ profit }) => {
  const { totalProfit, contractReward, referralReward, otherProfit } = profit ?? {};

  return (
    <HistoryInfoBox>
      <StyledCardColorBorder>
        <HistoryInfoHeading>Общая прибыль:</HistoryInfoHeading>
        <HistoryInfoAmount>$ {totalProfit || '0.00'}</HistoryInfoAmount>
      </StyledCardColorBorder>
      <StyledCardColorBorder>
        <HistoryInfoHeading>Прибыль по контрактам:</HistoryInfoHeading>
        <HistoryInfoAmount>$ {contractReward || '0.00'}</HistoryInfoAmount>
      </StyledCardColorBorder>
      <StyledCardColorBorder>
        <HistoryInfoHeading>Реферальная прибыль:</HistoryInfoHeading>
        <HistoryInfoAmount>$ {referralReward || '0.00'}</HistoryInfoAmount>
      </StyledCardColorBorder>
      <StyledCardColorBorder>
        <HistoryInfoHeading>Остальная прибыль:</HistoryInfoHeading>
        <HistoryInfoAmount>$ {otherProfit || '0.00'}</HistoryInfoAmount>
      </StyledCardColorBorder>
    </HistoryInfoBox>
  );
};
