import { decimal } from 'src/consts';
import { BigNumber } from 'bignumber.js';
import { convertBigMoney } from '@utils/convertTo';

export const groupByDuration = (dataArr) => {
  return dataArr.reduce((result, item) => {
    const duration = item.Duration;

    if (!result[duration]) {
      result[duration] = [];
    }

    result[duration].push(item);

    return result;
  }, {});
};

export const getAndConvertPromoPackage = (dataArr) => {
  const promoPackage = [...dataArr].filter((el: any) => el.ID === 1);
  const CPP = promoPackage.map((pcg: any) => {
    return {
      id: pcg.ID,
      title: `Пакет «Промо» на ${secondsToMonths(pcg.Duration)}`,
      period: `${secondsToMonths(pcg.Duration)}`,
      minInvestAmount: convertBigMoney(pcg.MinInvestAmount),
      maxInvestAmount: convertBigMoney(pcg.MaxInvestAmount),
      amount: `$${convertBigMoney(pcg.MinInvestAmount, true)} – $${convertBigMoney(pcg.MaxInvestAmount, true)}`,
      day_profit: convertProfitPercent(pcg.DailyRewardPercent, 1).toString(),
      month_profit: convertProfitPercent(pcg.DailyRewardPercent, 30).toString(),
      year_profit: convertProfitPercent(pcg.DailyRewardPercent, 360).toString(),
    };
  });
  return CPP[0];
};

export const formatMonths = (months) => {
  const remainder10 = months % 10;
  const remainder100 = months % 100;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return 'месяцев';
  } else if (remainder10 === 1) {
    return 'месяц';
  } else if (remainder10 >= 2 && remainder10 <= 4) {
    return 'месяца';
  } else {
    return 'месяцев';
  }
};

export const secondsToMonths = (durationSeconds: any, calc = false) => {
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerMonth = 30;

  const months = durationSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay * daysPerMonth);
  return calc ? months : `${months} ${formatMonths(months)}`;
};

export const secondsToDays = (durationSeconds: any) => {
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;

  const days = durationSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay);
  return days;
};

export const convertMoney = (amount) => {
  const converted = Number(BigInt(amount) / decimal).toFixed(2);
  return +converted.toString();
};

export const convertProfitPercent = (dailyRewardPercent, period) => {
  return BigNumber(dailyRewardPercent).multipliedBy(period).multipliedBy(100).dividedBy(BigNumber(1e29));
};

export const convertData = (groupedObject) => {
  const data = [];

  for (const duration in groupedObject) {
    const openedValues = groupedObject[duration].map((item) => ({
      id: item.ID,
      title: `Пакет «Промо» на ${secondsToMonths(item.Duration)}`,
      duration: item.Duration,
      period: `${secondsToMonths(item.Duration)}`,
      minInvestAmount: convertBigMoney(item.MinInvestAmount),
      maxInvestAmount: convertBigMoney(item.MaxInvestAmount),
      amount:
        Number(convertMoney(item.MaxInvestAmount)) === 1e26
          ? '10000+'
          : `$${convertBigMoney(item.MinInvestAmount, true)} – $${convertBigMoney(item.MaxInvestAmount, true)}`,
      day_profit: convertProfitPercent(item.DailyRewardPercent, 1).toString(),
      month_profit: convertProfitPercent(item.DailyRewardPercent, 30).toString(),
      year_profit: convertProfitPercent(item.DailyRewardPercent, 360).toString(),
    }));

    const closedValuesMinAmount = `${Math.min(
      ...groupedObject[duration].map((item) => convertBigMoney(item.MinInvestAmount)),
    )}`;
    const closedValuesMaxAmount = `${Math.max(
      ...groupedObject[duration].map((item) => convertBigMoney(item.MaxInvestAmount)),
    )}`;

    const closedValues = {
      amount: `$${BigNumber(closedValuesMinAmount)} – $${
        Number(closedValuesMaxAmount) === 1e26 ? '10000+' : BigNumber(closedValuesMaxAmount)
      }`,
      day_profit: `${openedValues[0].day_profit} - ${openedValues[openedValues.length - 1].day_profit}`,
      month_profit: `${openedValues[0].month_profit} - ${openedValues[openedValues.length - 1].month_profit}`,
      year_profit: `${openedValues[0].year_profit} - ${openedValues[openedValues.length - 1].year_profit}`,
    };

    const item = {
      id: duration,
      period: secondsToMonths(duration),
      openedValues,
      closedValues,
    };

    data.push(item);
  }

  return data;
};
