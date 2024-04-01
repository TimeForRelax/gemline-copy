import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface useUserNameType {
  userId: string;
}

export const useUserName = ({ userId }: useUserNameType) => {
  return useQuery({
    queryKey: ['name', userId],
    queryFn: () => HttpService.get(`${API_URL}/name/${userId}`),
    enabled: Boolean(userId),
  });
};
