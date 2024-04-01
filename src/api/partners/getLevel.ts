import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { ls } from '@utils/ls';
import { API_URL } from 'src/consts';
import { LsValueType } from '@enums/index';

export const useLevel = () => {
  const userId = ls.get(LsValueType.user_id);

  return useQuery({
    queryKey: ['level', userId],
    queryFn: () => HttpService.get(`${API_URL}/level/${userId}/USDT`),
    enabled: Boolean(userId),
  });
};
