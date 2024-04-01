import { CallbackData, UseApiMutationOptions } from '@api/types';
import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@utils/index';
import { API_URL } from 'src/consts';

interface UpdateName {
  Name: string;
}

export const useUpdateName = ({ onSuccess, onError }: UseApiMutationOptions) => {
  const { mutate } = useMutation<CallbackData, CallbackData, UpdateName, unknown>({
    mutationFn: (data) => {
      return HttpService.patch(`${API_URL}/name`, data);
    },
    onSuccess,
    onError,
  });

  return mutate;
};
