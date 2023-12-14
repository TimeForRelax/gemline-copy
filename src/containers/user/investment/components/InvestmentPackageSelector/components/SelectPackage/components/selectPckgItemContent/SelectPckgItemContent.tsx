import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media, theme } from '@styles/index';
import { FC } from 'react';

const SelectPckgBoxItemContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
`;

const SelectPckgBoxItemContentHeading = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito400;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  ${media.phone} {
    font-size: 13px;
  }
`;

const SelectPckgBoxItemContentText = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &.green {
    color: ${colorFetch('green')({ theme })};
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
      <SelectPckgBoxItemContentHeading>{heading}</SelectPckgBoxItemContentHeading>
      <SelectPckgBoxItemContentText className={className ? className : ''}>{amount}</SelectPckgBoxItemContentText>
    </SelectPckgBoxItemContent>
  );
};
