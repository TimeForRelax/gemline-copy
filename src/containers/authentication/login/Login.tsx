import { Footer } from '@components/index';
import { AuthenticationWrapper } from '@styles/index';
import { FC } from 'react';
import { AuthorizationForm } from './components/authorizationForm/AuthorizationForm';

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  return (
    <AuthenticationWrapper>
      <AuthorizationForm />
      <Footer />
    </AuthenticationWrapper>
  );
};
