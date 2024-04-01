import { LsValueType } from '@enums/index';
import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { ls } from '@utils/index';
import { API_URL } from 'src/consts';
import { calculateHistoryProfit, convertData } from './utils/utils';

export const useHistory = () => {
  const userId = ls.get(LsValueType.user_id);

  return useQuery({
    queryKey: ['history', userId],
    queryFn: async () => {
      try {
        const res = await HttpService.get(`${API_URL}/history/${userId}`);
        const isHistory = res?.data?.length > 0;
        const convertedData = isHistory ? convertData([...res.data]) : [];
        const calculatedProfit = isHistory ? calculateHistoryProfit([...res.data]) : {};
        return { rows: convertedData, calculatedProfit };
      } catch (error) {
        throw new Error(`Error when fetching invest packages data: ${error.message}`);
      }
    },
    enabled: Boolean(userId),
  });
};
