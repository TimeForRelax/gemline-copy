import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, theme } from '@styles/index';
import { FC } from 'react';
import { data } from './data/data';

const TableHeadingBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr) 26px;
  gap: 20px;
  padding: 0 30px;
`;

const TableHeadingText = styled(Typography)`
  color: ${colorFetch('silver_chalice')({ theme })};
  font-family: Nunito600;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

interface TableHeadingProps {}

export const TableHeading: FC<TableHeadingProps> = () => {
  return (
    <TableHeadingBox>
      {data.map((text: string, i: number) => (
        <TableHeadingText key={i}>{text}</TableHeadingText>
      ))}
    </TableHeadingBox>
  );
};
