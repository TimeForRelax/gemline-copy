import { LsValueType } from '@enums/index';
import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { ls } from '@utils/index';
import { API_URL } from 'src/consts';
import { convertData, getAndConvertPromoPackage, groupByDuration } from './utils/utils';

export const useInvestPackages = () => {
  const userId = ls.get(LsValueType.user_id);

  return useQuery({
    queryKey: ['packages', userId],
    queryFn: async () => {
      try {
        const res = await HttpService.get(`${API_URL}/contracts/true`);
        const groupedData = groupByDuration([...res.data].filter((el: any) => el.ID !== 1));
        const convertedData = convertData(groupedData);
        const convertedPromoPackage = getAndConvertPromoPackage(res.data);
        return { convertedData, convertedPromoPackage };
      } catch (error) {
        throw new Error(`Error when fetching invest packages data: ${error.message}`);
      }
    },
    enabled: Boolean(userId),
  });
};
