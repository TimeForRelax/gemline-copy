import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { ls } from '@utils/ls';
import { API_URL } from 'src/consts';
import { LsValueType } from '@enums/index';

export const useInviterName = () => {
  const userId = ls.get(LsValueType.user_id);

  return useQuery({
    queryKey: ['inviter-name', userId],
    queryFn: () => HttpService.get(`${API_URL}/inviter-name/${userId}`),
    enabled: Boolean(userId),
  });
};
