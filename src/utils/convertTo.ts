import BigNumber from 'bignumber.js';

export const bigDecimal = BigNumber('1000000000000000000');

export const convertBigMoney = (amount: any, withoutFixed = false): any => {
  const convertedAmount = BigNumber(amount).dividedBy(bigDecimal);
  return withoutFixed ? convertedAmount : convertedAmount.toFixed(2);
};
