import { LsValueType } from '@enums/LsValueType';
import { LoadingScreen } from '@features/index';
import { getPath, View } from '@routes/index';
import { cs, ls, useGetQueryFromURL } from '@utils/index';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserSwitcherProps {}

export const UserSwitcher: FC<UserSwitcherProps> = () => {
  const queryParams = useGetQueryFromURL(['UserId', 'UserAuthToken']);

  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const userID = ls.get(LsValueType.user_id);
  const token = ls.get(LsValueType.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      queryParams.UserId &&
      queryParams.UserAuthToken &&
      (queryParams.UserId !== userID || queryParams.UserAuthToken !== token)
    ) {
      ls.set(LsValueType.user_id, queryParams.UserId);
      cs.set(LsValueType.user_id, queryParams.UserId);

      ls.set(LsValueType.token, queryParams.UserAuthToken);
      cs.set(LsValueType.token, queryParams.UserAuthToken);

      setShouldNavigate(true);
    }

    if (token && userID && queryParams.UserId !== userID && queryParams.UserAuthToken !== token) {
      setShouldNavigate(true);
    }

    if (shouldNavigate) {
      clearTimeout(timerId);
      navigate(getPath(View.USER_INVESTMENT));
    }
  }, [queryParams, queryParams.UserId, queryParams.UserAuthToken, token, userID, shouldNavigate, timerId, navigate]);

  useEffect(() => {
    if (!userID && !token) {
      const id = setTimeout(() => {
        navigate(getPath(View.ERROR_401));
      }, 3000);

      setTimerId(id);
    }
  }, [navigate, token, userID]);

  return <LoadingScreen />;
};
