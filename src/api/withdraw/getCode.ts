import { CallbackData, UseApiMutationOptions } from '@api/types';
import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface GetWithDrawCodeData {
  AssetId: number;
  Amount: string;
  Address: string;
  Network: string;
  Token: string;
}

export const useGetWithDrawCode = ({ onSuccess, onError }: UseApiMutationOptions) => {
  const { mutate } = useMutation<CallbackData, CallbackData, GetWithDrawCodeData, unknown>({
    mutationFn: (data) => {
      return HttpService.post(`${API_URL}/withdraw`, data);
    },
    onSuccess,
    onError,
  });

  return mutate;
};
