import { convertProfitPercent, secondsToDays, secondsToMonths } from '@api/investment/utils/utils';
import { LsValueType } from '@enums/index';
import { useQuery } from '@tanstack/react-query';
import { convertBigMoney } from '@utils/convertTo';
import { HttpService } from '@utils/http';
import { ls } from '@utils/index';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { API_URL } from 'src/consts';

const stages = {
  30: ['Покупка'],
  90: ['Покупка', 'Огранка'],
  180: ['Покупка', 'Огранка', 'Продажа'],
  360: ['Покупка', 'Огранка', 'Продажа', 'Выдержка'],
};
// export const bigDecimal = BigNumber('1000000000000000000');
// export const convertBigMoney = (amount: any) => {
//   return BigNumber(amount).dividedBy(bigDecimal);
// };

const convertData = (contracts: Array<any>) => {
  let activeInvestSum = BigNumber('0');
  let completedInvestSum = BigNumber('0');
  let activeInvestmentSumPerDay = BigNumber('0');
  let activeTotalReward = BigNumber('0');
  let completedTotalReward = BigNumber('0');
  let totalRewardDate;
  const activeContracts = [];
  const completedContracts = [];

  contracts?.length > 0 &&
    contracts.forEach((el) => {
      if (!el.UserInvestment.Claimed) {
        const amount = convertBigMoney(el.UserInvestment.Amount, true);
        const dailyPercent = convertProfitPercent(el.Contract.DailyRewardPercent, 1);
        const dailyReward = amount.multipliedBy(dailyPercent.dividedBy(100));
        const contractReward = dailyReward.multipliedBy(secondsToDays(el.Contract.Duration));
        const claimDate = dayjs.unix(el.UserInvestment.ClaimDate);
        const remainingDays = claimDate.diff(dayjs(), 'day');
        const currentStatusReward = contractReward.minus(dailyReward.multipliedBy(remainingDays));

        if (!totalRewardDate || totalRewardDate?.isBefore(claimDate)) totalRewardDate = claimDate;

        activeInvestSum = activeInvestSum.plus(amount);
        activeInvestmentSumPerDay = activeInvestmentSumPerDay.plus(dailyReward);
        activeTotalReward = activeTotalReward.plus(contractReward);

        activeContracts.push({
          pckgId: el.UserInvestment.ContractID,
          contactNumber: el.UserInvestment.ID,
          investments: amount.toFixed(2),
          term: secondsToMonths(el.Contract.Duration),
          remainingDays: remainingDays,
          totalDays: secondsToDays(el.Contract.Duration),
          dailyProfit: {
            percentage: dailyPercent.toFixed(2),
            amount: dailyReward.toFixed(2),
          },
          stages: stages[secondsToDays(el.Contract.Duration)],
          progress: {
            current: currentStatusReward.toFixed(2),
            total: contractReward.toFixed(2),
          },
        });
      } else {
        const amount = convertBigMoney(el.UserInvestment.Amount, true);
        const dailyPercent = convertProfitPercent(el.Contract.DailyRewardPercent, 1);
        const dailyReward = amount.multipliedBy(dailyPercent.dividedBy(100));
        const contractReward = dailyReward.multipliedBy(secondsToDays(el.Contract.Duration));

        completedInvestSum = completedInvestSum.plus(amount);
        completedTotalReward = completedTotalReward.plus(contractReward);

        completedContracts.push({
          pckgId: el.UserInvestment.ContractID,
          contactNumber: el.UserInvestment.ID,
          investments: amount.toFixed(2),
          term: secondsToMonths(el.Contract.Duration),
          remainingDays: 0,
          totalDays: secondsToDays(el.Contract.Duration),
          dailyProfit: {
            percentage: dailyPercent.toFixed(2),
            amount: dailyReward.toFixed(2),
          },
          stages: stages[secondsToDays(el.Contract.Duration)],
          progress: {
            current: contractReward.toFixed(2),
            total: contractReward.toFixed(2),
          },
        });
      }
    });

  return {
    active: {
      summary: [
        {
          heading: 'Все инвестиции:',
          amount: `$ ${activeInvestSum.toFixed(2)}`,
          infoText: '',
          dateTo: '',
        },
        {
          heading: 'Доход в день',
          amount: `$ ${activeInvestmentSumPerDay.toFixed(2)}`,
          infoText: '',
          dateTo: '',
        },
        {
          heading: 'Ожидаемая прибыль',
          amount: `$ ${activeTotalReward.toFixed(2)}`,
          infoText: 'Прибыль, которую Вы получите в рамках активных контрактов',
          dateTo: activeContracts?.length > 0 ? `до ${totalRewardDate.format('DD.MM.YYYY')}` : '',
        },
      ],
      contracts: activeContracts,
    },
    completed: {
      summary: [
        {
          heading: 'Инвестировано:',
          amount: `$ ${completedInvestSum.toFixed(2)}`,
          infoText: '',
          dateTo: '',
        },
        {
          heading: 'Получено дохода:',
          amount: `$ ${completedTotalReward.toFixed(2)}`,
          infoText: '',
          dateTo: '',
        },
      ],
      contracts: completedContracts,
    },
  };
};

export const useContracts = () => {
  const userId = ls.get(LsValueType.user_id);

  return useQuery({
    queryKey: ['contracts', userId],
    queryFn: async () => {
      try {
        const res = await HttpService.get(`${API_URL}/investments/${userId}`);
        const isContracts = res?.data?.length <= 0;
        const convertedData = convertData([...res.data]);
        return { isContracts, data: convertedData };
      } catch (error) {
        throw new Error(`Error when fetching invest packages data: ${error.message}`);
      }
    },
    enabled: Boolean(userId),
  });
};
