import { HttpService } from '@utils/http';
import { useQuery } from 'react-query';

export const useApiToken = () => {
  const { data } = useQuery(['Login'], {
    queryFn: () => HttpService.get('some/url'),
  });
};
