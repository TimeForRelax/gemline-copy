import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface useUserEmailType {
  userId: string;
}

export const useUserEmail = ({ userId }: useUserEmailType) => {
  return useQuery({
    queryKey: ['email', userId],
    queryFn: () => HttpService.get(`${API_URL}/login/${userId}`),
    enabled: Boolean(userId),
  });
};
