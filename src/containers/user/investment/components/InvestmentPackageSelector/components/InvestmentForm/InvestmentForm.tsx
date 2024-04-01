import { InputWithStartAdornment } from '@components/index';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch } from '@styles/index';
import { FC } from 'react';
import { useGlobalState } from 'src/globalContext';

const InvestmentFormBox = styled(Box)``;

const StartAdornment = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  padding: 0 8px 0 4px;
`;

interface InvestmentFormProps {
  errors: any;
  register: any;
}

export const InvestmentForm: FC<InvestmentFormProps> = ({ errors, register }) => {
  const { balance } = useGlobalState();

  return (
    <InvestmentFormBox component={'form'}>
      <InputWithStartAdornment
        label={''}
        placeholder={'0'}
        type={'text'}
        name={'investAmount'}
        error={!!errors.amount}
        helperText={errors.amount?.message}
        rules={{
          ...register('amount', {
            required: 'Обязательное поле',
            validate: (value, formValues) => {
              if (Number(value) < 50) return 'Минимальная сумма инвестиции 50$';
              if (Number(value) > Number(balance)) return 'Недостаточно средств';
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Разрешен ввод только цифр',
            },
          }),
        }}
        startAdornment={<StartAdornment>$</StartAdornment>}
      />
    </InvestmentFormBox>
  );
};
