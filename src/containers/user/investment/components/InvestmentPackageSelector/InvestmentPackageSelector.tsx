import { secondsToMonths } from '@api/investment/utils/utils';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import BigNumber from 'bignumber.js';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { InvestmentForm, SelectPackage } from './components/index';

const InvestmentPackageSelectorBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 50px;

  ${media.tabletPro} {
    flex-direction: column;
  }

  ${media.tablet} {
    margin-bottom: 10px;
  }
`;

const InvestBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 340px;
  height: max-content;
  flex-shrink: 0;
  padding: 30px;
  border-radius: 24px;
  background: ${colorFetch('white')};

  ${media.phone} {
    width: 100%;
    padding: 16px;
  }
`;

const InvestBoxHeading = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;

  ${media.phone} {
    font-size: 16px;
  }
`;

interface InvestmentPackageSelectorProps {
  data: any;
  isShowPromoInfo: boolean;
}
interface IFormInput {
  amount: string;
}

export const InvestmentPackageSelector: FC<InvestmentPackageSelectorProps> = ({ data, isShowPromoInfo }) => {
  const { register, watch, formState } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: {
      amount: '',
    },
  });
  const amount = watch('amount');
  const { errors } = formState;

  const disabled = useMemo(() => Number(amount) === 0 || !!errors.amount, [amount, errors.amount]);

  const isShowPromo = useMemo(() => {
    const { minInvestAmount, maxInvestAmount } = data?.convertedPromoPackage ?? {};
    return (
      !disabled &&
      Number(amount) >= Number(minInvestAmount) &&
      Number(amount) <= Number(maxInvestAmount) &&
      isShowPromoInfo
    );
  }, [amount, disabled, data?.convertedPromoPackage, isShowPromoInfo]);

  const calcPromoPackageProfit = useMemo(() => {
    const { id, period, day_profit, month_profit } = data?.convertedPromoPackage ?? {};

    const calculateSumProfit = () => {
      if (isShowPromo) {
        const sumProfit = BigNumber(amount).multipliedBy(BigNumber(month_profit)).dividedBy(BigNumber(100)).toFixed(2);
        return sumProfit;
      } else {
        return '0';
      }
    };

    return {
      id,
      period,
      day_profit: isShowPromo ? `${day_profit} %` : '0 %',
      sumProfit: `$ ${calculateSumProfit()}`,
    };
  }, [amount, data, isShowPromo]);

  const calcPckgsProfit = useMemo(() => {
    return data?.convertedData.map((el) => {
      const filteredPckgInfo = el.openedValues.find(
        (pckg) => Number(amount) >= pckg.minInvestAmount && Number(amount) <= pckg.maxInvestAmount,
      );

      const calculateSumProfit = () => {
        if (
          !filteredPckgInfo ||
          Number(amount) === 0 ||
          (!!errors.amount && errors?.amount?.message !== 'Недостаточно средств')
        ) {
          return 0;
        }

        const durationInMonths = secondsToMonths(filteredPckgInfo.duration, true);
        const monthlyProfit = (filteredPckgInfo.month_profit * Number(durationInMonths)) / 100;
        const sumProfit = BigNumber(amount).multipliedBy(BigNumber(monthlyProfit)).toFixed(2);

        return sumProfit;
      };

      return {
        id: el.id,
        profit: {
          id: filteredPckgInfo?.id || null,
          period: filteredPckgInfo?.period || el.period,
          day_profit: filteredPckgInfo ? `${filteredPckgInfo.day_profit} %` : '0 %',
          sumProfit: `$ ${calculateSumProfit()}`,
        },
      };
    });
  }, [amount, data, errors?.amount]);

  return (
    <InvestmentPackageSelectorBox>
      <InvestBox>
        <InvestBoxHeading>Введите сумму инвестиции</InvestBoxHeading>
        <InvestmentForm errors={errors} register={register} />
      </InvestBox>
      <SelectPackage
        amount={amount}
        disabled={disabled}
        isShowPromo={isShowPromo}
        calcPromoPackageProfit={calcPromoPackageProfit}
        calcPckgsProfit={calcPckgsProfit}
      />
    </InvestmentPackageSelectorBox>
  );
};
