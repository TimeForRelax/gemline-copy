import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { media } from '@styles/index';
import { FC } from 'react';
import { FinantialSummaryItem } from './components/financialSummaryItem/FinancialSummaryItem';

const FinancialSummaryBlocksBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;

  ${media.tablet} {
    gap: 15px;
  }

  ${media.phone} {
    margin-bottom: 30px;
  }
`;

interface FinancialSummaryBlocksProps {
  summary: any[];
}

export const FinancialSummaryBlocks: FC<FinancialSummaryBlocksProps> = ({ summary }) => {
  return (
    <FinancialSummaryBlocksBox>
      {summary.map((el: Record<string, string>, i: number) => (
        <FinantialSummaryItem
          key={i}
          heading={el.heading}
          amount={el.amount}
          infoText={el.infoText}
          dateTo={el.dateTo}
        />
      ))}
    </FinancialSummaryBlocksBox>
  );
};
