import { Footer } from '@components/index';
import { AuthenticationWrapper } from '@styles/index';
import { FC, useState } from 'react';
import { FinishRegistration } from './components/finishRegisration/FinishRegistration';
import { RegistrationForm } from './components/registrationForm/RegistrationForm';

interface RegistrationProps {}

export const Registration: FC<RegistrationProps> = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);

  return (
    <AuthenticationWrapper>
      {!isComplete ? <RegistrationForm /> : <FinishRegistration />}
      <Footer />
    </AuthenticationWrapper>
  );
};
