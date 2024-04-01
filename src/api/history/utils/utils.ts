import { convertBigMoney } from '@utils/convertTo';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';

export const convertData = (transactions: any[]) => {
  return transactions.map((el) => {
    return {
      transactionId: el.ID,
      dateAndTime: dayjs(el.CreatedAt * 1000).format('DD.MM.YYYY HH:mm:ss'),
      action: el.Action,
      sum: `${convertBigMoney(el.Description.Amount)} $`,
      balance: el?.Balance ? `${convertBigMoney(el?.Balance)} $` : `${convertBigMoney(BigNumber(0))} $`,
    };
  });
};

export const calculateHistoryProfit = (transactions) => {
  let totalProfit = BigNumber('0');
  let contractReward = BigNumber('0');
  let referralReward = BigNumber('0');
  let otherProfit = BigNumber('0');

  const filteredTransactions = transactions.filter((transaction) => transaction.Action !== 'Invest');
  filteredTransactions.forEach((transaction) => {
    const amount = transaction.Description.Amount;

    switch (transaction.Action) {
      case 'ContractReward':
        contractReward = contractReward.plus(BigNumber(amount));
        break;
      case 'ReferralReward':
        referralReward = referralReward.plus(BigNumber(amount));
        break;
      case 'RankReward':
        otherProfit = otherProfit.plus(BigNumber(amount));
        break;

      default:
        break;
    }
  });

  totalProfit = contractReward.plus(referralReward).plus(otherProfit);

  return {
    totalProfit: convertBigMoney(totalProfit),
    contractReward: convertBigMoney(contractReward),
    referralReward: convertBigMoney(referralReward),
    otherProfit: convertBigMoney(otherProfit),
  };
};
