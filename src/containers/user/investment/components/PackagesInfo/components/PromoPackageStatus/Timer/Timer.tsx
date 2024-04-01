import { RegDateCtx } from '@containers/user/investment/Invesment';
import { formatDays, formatHours, formatMinutes } from '@containers/user/investment/utils/utils';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FC, useContext } from 'react';

dayjs.extend(duration);

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
  background: ${colorFetch('green')};

  ${media.tabletPro} {
    flex: 1;
  }

  ${media.phone} {
    padding: 6px;
  }
`;

const TimerTimeText = styled(Box)`
  color: ${colorFetch('white')};
  font-family: Gilroy700;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  white-space: nowrap;

  ${media.phone} {
    font-size: 15px;
    line-height: 21px;
  }
`;

interface TimerProps {}

export const Timer: FC<TimerProps> = () => {
  const timeRemaining = useContext(RegDateCtx);

  return (
    <TimerBox>
      <TimerTimeBox>
        <TimerTimeText>
          {timeRemaining.days} {formatDays(timeRemaining.days)}
        </TimerTimeText>
      </TimerTimeBox>
      <TimerTimeBox>
        <TimerTimeText>
          {timeRemaining.hours} {formatHours(timeRemaining.hours)}
        </TimerTimeText>
      </TimerTimeBox>
      <TimerTimeBox>
        <TimerTimeText>
          {timeRemaining.minutes} {formatMinutes(timeRemaining.minutes)}
        </TimerTimeText>
      </TimerTimeBox>
    </TimerBox>
  );
};
