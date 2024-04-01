import { CallbackData, UseApiMutationOptions } from '@api/types';
import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@utils/index';
import { API_URL } from 'src/consts';

interface UpdatePassword {
  Password: string;
}

export const useUpdatePassword = ({ onSuccess, onError }: UseApiMutationOptions) => {
  const { mutate } = useMutation<CallbackData, CallbackData, UpdatePassword, unknown>({
    mutationFn: (data) => {
      return HttpService.patch(`${API_URL}/password`, data);
    },
    onSuccess,
    onError,
  });

  return mutate;
};
