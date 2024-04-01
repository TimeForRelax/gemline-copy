import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface useRegistrationDateType {
  userId: string;
}

export const useRegistrationDate = ({ userId }: useRegistrationDateType) => {
  return useQuery({
    queryKey: ['reg-date', userId],
    queryFn: () => HttpService.get(`${API_URL}/registration-date/${userId}`),
    enabled: Boolean(userId),
  });
};
