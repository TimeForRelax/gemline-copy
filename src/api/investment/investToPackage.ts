import { CallbackData, UseApiMutationOptions } from '@api/types';
import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface InvestData {
  ContractId: number;
  Amount: string;
  Token: string;
}

export const useInvestToPackage = ({ onSuccess, onError }: UseApiMutationOptions) => {
  const { mutate } = useMutation<CallbackData, CallbackData, InvestData, unknown>({
    mutationFn: (data) => {
      return HttpService.post(`${API_URL}/invest`, data);
    },
    onSuccess,
    onError,
  });

  return mutate;
};
