import { CallbackData, UseApiMutationOptions } from '@api/types';
import { useMutation } from '@tanstack/react-query';
import { HttpService } from '@utils/http';
import { API_URL } from 'src/consts';

interface ValidateJWTData {}

export const useValidateJWT = ({ onSuccess, onError }: UseApiMutationOptions) => {
  const { mutate } = useMutation<CallbackData, CallbackData, ValidateJWTData, unknown>({
    mutationFn: (data) => {
      return HttpService.post(`${API_URL}/validate-jwt`, data);
    },
    onSuccess,
    onError,
  });

  return mutate;
};
