import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

export const useAllRanks = () => {
  return useQuery({
    queryKey: ['all-ranks'],
    queryFn: () => HttpService.get(`${API_URL}/ranks`),
  });
};
