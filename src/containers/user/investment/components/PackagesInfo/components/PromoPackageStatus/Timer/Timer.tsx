import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { colorFetch, media, theme } from '@styles/index';
import { FC, useEffect, useState } from 'react';

const TimerBox = styled(Box)`
  display: flex;
  gap: 10px;
  width: max-content;
  height: 45px;
  border-radius: 12px;

  ${media.tabletPro} {
    width: 100%;
  }

  ${media.phone} {
    height: max-content;
    justify-content: space-around;
  }
`;

const TimerTimeBox = styled(Box)`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${colorFetch('gray')({ theme })};

  ${media.tabletPro} {
    flex: 1;
  }

  ${media.phone} {
    padding: 6px;
  }
`;

const TimerTimeText = styled(Box)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  white-space: nowrap;

  ${media.phone} {
    font-size: 15px;
    line-height: 21px;
  }
`;

interface TimerProps {
  targetDate: string;
}

export const Timer: FC<TimerProps> = ({ targetDate }) => {
  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <TimerBox>
      <TimerTimeBox>
        <TimerTimeText>{timeRemaining.days} дней</TimerTimeText>
      </TimerTimeBox>
      <TimerTimeBox>
        <TimerTimeText>{timeRemaining.hours} часов</TimerTimeText>
      </TimerTimeBox>
      <TimerTimeBox>
        <TimerTimeText>{timeRemaining.minutes} минуты</TimerTimeText>
      </TimerTimeBox>
    </TimerBox>
  );
};
