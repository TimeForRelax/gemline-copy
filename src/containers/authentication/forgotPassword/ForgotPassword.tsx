import { AuthenticationWrapper } from '@styles/index';
import { FC, useState } from 'react';
import { FinishResetPassword } from './components/finishResetPassword/FinishResetPassword';
import { ForgotPasswordForm } from './components/forgotPasswordForm/ForgotPasswordForm';

interface ForgotPasswordProps {}

export const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [isComplete, setIsComplete] = useState<boolean>(true);

  return (
    <AuthenticationWrapper>{!isComplete ? <ForgotPasswordForm /> : <FinishResetPassword />}</AuthenticationWrapper>
  );
};
