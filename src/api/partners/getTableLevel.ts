import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

export const useTableLevel = () => {
  return useQuery({
    queryKey: ['table-levels'],
    queryFn: () => HttpService.get(`${API_URL}/levels`),
  });
};
