import { InputWithStartAdornment } from '@components/index';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, theme } from '@styles/index';
import { FC } from 'react';

const InvestmentFormBox = styled(Box)``;
const StartAdornment = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito600;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  padding: 0 8px 0 4px;
`;

interface InvestmentFormProps {}

export const InvestmentForm: FC<InvestmentFormProps> = () => {
  return (
    <InvestmentFormBox component={'form'}>
      <InputWithStartAdornment
        label={''}
        placeholder={'0'}
        type={'text'}
        name={'investAmount'}
        error={false}
        helperText={''}
        rules={{}}
        startAdornment={<StartAdornment>$</StartAdornment>}
      />
    </InvestmentFormBox>
  );
};
