import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface useBalanceType {
  userId: string;
  currency?: string;
}

export const useBalance = ({ userId, currency }: useBalanceType) => {
  return useQuery({
    queryKey: ['balance', userId, currency],
    queryFn: () => HttpService.get(`${API_URL}/balance/${userId}/USDT`),
    enabled: Boolean(userId),
  });
};
