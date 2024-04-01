import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';

const ContentInfoBox = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex: 1;
  gap: 10px;

  ${media.tabletPro} {
    width: 100%;
  }

  ${media.phone} {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const ContentInfoItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: max-content;
`;

const ContentInfoItemHeading = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  ${media.tabletPro} {
    font-size: 14px;
  }

  ${media.phone} {
    font-size: 12px;
  }
`;

const ContentInfoItemAmount = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;

  &.investment {
    color: ${colorFetch('green')};
  }

  ${media.tabletPro} {
    font-size: 18px;
  }

  ${media.phone} {
    font-size: 16px;
  }
`;

interface ContractFinantialInfoProps {
  investments: string;
  term: string;
  percentage: string;
  amount: string;
}

export const ContractFinantialInfo: FC<ContractFinantialInfoProps> = ({ investments, term, percentage, amount }) => {
  return (
    <ContentInfoBox>
      <ContentInfoItem>
        <ContentInfoItemHeading>Инвестиции</ContentInfoItemHeading>
        <ContentInfoItemAmount className="investment">$ {investments}</ContentInfoItemAmount>
      </ContentInfoItem>
      <ContentInfoItem>
        <ContentInfoItemHeading>Срок</ContentInfoItemHeading>
        <ContentInfoItemAmount>{term}</ContentInfoItemAmount>
      </ContentInfoItem>
      <ContentInfoItem>
        <ContentInfoItemHeading>Дневная прибыль</ContentInfoItemHeading>
        <ContentInfoItemAmount>
          {percentage}% / $ {amount}
        </ContentInfoItemAmount>
      </ContentInfoItem>
    </ContentInfoBox>
  );
};
