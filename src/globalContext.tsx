import { useBalance, useUserEmail, useUserName } from '@api/index';
import { LsValueType } from '@enums/LsValueType';
import { convertBigMoney } from '@utils/convertTo';
import { ls } from '@utils/ls';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);
const GlobalContext = createContext(null);

export const useGlobalState = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const intervalRef = useRef(null);
  const promoStartDate = dayjs.tz('07-03-2024 00:00:00', 'DD-MM-YYYY HH:mm:ss', 'Europe/Moscow').startOf('day');

  const [userId, setUserId] = useState(ls.get(LsValueType.user_id) ?? '');

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const storedUserId = ls.get(LsValueType.user_id);

      if (storedUserId) {
        setUserId(storedUserId);
        clearInterval(intervalRef.current);
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  const [userName, setUserName] = useState('User User');
  const [userEmail, setUserEmail] = useState('test@gmail.com');
  const [balance, setBalance] = useState('0');

  const { data: balanceData, isSuccess: isBalanceSuccess, refetch: refetchBalance } = useBalance({ userId });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchBalance();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetchBalance]);

  useEffect(() => {
    if (isBalanceSuccess) {
      setBalance(convertBigMoney(balanceData.data));
    }
  }, [balanceData, isBalanceSuccess]);

  const { data: userNameData, isSuccess: isUserNameSuccess } = useUserName({ userId });

  useEffect(() => {
    if (isUserNameSuccess) {
      setUserName(userNameData.data);
    }
  }, [userNameData, isUserNameSuccess]);

  const { data: userEmailData, isSuccess: isUserEmailSuccess } = useUserEmail({ userId });

  useEffect(() => {
    if (isUserEmailSuccess) {
      setUserEmail(userEmailData.data);
    }
  }, [userEmailData, isUserEmailSuccess]);

  const providerValue = useMemo(
    () => ({
      userName,
      balance,
      promoStartDate,
      userEmail,
      setUserName,
      setBalance,
    }),
    [userName, balance, userEmail, promoStartDate],
  );

  return <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>;
};
