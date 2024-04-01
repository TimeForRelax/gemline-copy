import { CallbackData, UseApiMutationOptions } from '@api/types';
import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface ConfirmWithDrawCodeData {
  UnconfirmedWithdrawRequestId: number;
  ConfirmCode: number;
  Token: string;
}

export const useConfirmWithDrawCode = ({ onSuccess, onError }: UseApiMutationOptions) => {
  const { mutate } = useMutation<CallbackData, CallbackData, ConfirmWithDrawCodeData, unknown>({
    mutationFn: (data) => {
      return HttpService.post(`${API_URL}/confirm-withdraw`, data);
    },
    onSuccess,
    onError,
  });

  return mutate;
};
