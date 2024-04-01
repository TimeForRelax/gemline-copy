import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';

const SelectPckgBoxItemContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
`;

const SelectPckgBoxItemContentHeading = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  &.promo {
    color: ${colorFetch('white')};
  }

  &.greenModal {
    color: ${colorFetch('gray')};
  }

  ${media.phone} {
    font-size: 13px;
  }
`;

const SelectPckgBoxItemContentText = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &.promo {
    color: ${colorFetch('white')};
  }

  &.green {
    color: ${colorFetch('green')};
  }

  &.greenModal {
    font-size: 30px;
    color: ${colorFetch('green')};

    ${media.phone} {
      font-size: 24px;
    }
  }

  &.blackModal {
    font-size: 24px;

    ${media.phone} {
      font-size: 18px;
    }
  }

  ${media.phone} {
    font-size: 18px;
  }
`;

interface SelectPckgItemContentProps {
  heading: string;
  amount: string;
  className?: string;
}

export const SelectPckgItemContent: FC<SelectPckgItemContentProps> = ({ heading, amount, className }) => {
  return (
    <SelectPckgBoxItemContent>
      <SelectPckgBoxItemContentHeading className={className ? className : ''}>
        {heading}
      </SelectPckgBoxItemContentHeading>
      <SelectPckgBoxItemContentText className={className ? className : ''}>{amount}</SelectPckgBoxItemContentText>
    </SelectPckgBoxItemContent>
  );
};
