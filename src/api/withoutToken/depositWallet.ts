import { LsValueType } from '@enums/index';
import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { ls } from '@utils/index';
import { API_URL } from 'src/consts';

export const useDepositWallet = (networkType: string) => {
  const userId = ls.get(LsValueType.user_id);

  return useQuery({
    queryKey: ['deposit-wallet', userId, networkType],
    queryFn: () => HttpService.get(`${API_URL}/deposit-wallet/${userId}/${networkType}`),
    enabled: Boolean(userId && networkType),
  });
};
