import { useValidateJWT } from '@api/index';
import { LoadingScreen } from '@features/loadingScreen/LoadingScreen';
import { getPath, View } from '@routes/index';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WithAuthProps {
  children: ReactNode;
}

export const WithAuth: FC<WithAuthProps> = ({ children }) => {
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate();

  const validateJWTSuccess = ({ data }: any) => {
    setShowContent(true);
  };

  const validateJWTError = ({ response }: any) => {
    setShowContent(true);
    navigate(getPath(View.ERROR_401));
  };

  const validateJWT = useValidateJWT({ onSuccess: validateJWTSuccess, onError: validateJWTError });

  useEffect(() => {
    validateJWT({});

    const intervalId = setInterval(() => {
      validateJWT({});
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [validateJWT]);

  return showContent ? <>{children}</> : <LoadingScreen />;
};
