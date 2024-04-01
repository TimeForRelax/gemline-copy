import { ReactComponent as CalendarIcon } from '@assets/images/common/calendar_icon.svg';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { colorFetch, media } from '@styles/index';
import 'dayjs/locale/ru';
import { FC } from 'react';
import { Label } from '../historyFilterSelect/HistoryFilterSelect';

const DPContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 11px;

  ${media.tabletPro} {
    width: 100%;
    grid-row: 2;
  }
`;

const DRPBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;

  ${media.phone} {
    gap: 10px;
  }
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;

  & path {
    fill: ${colorFetch('black')};
    opacity: 0.3;
  }
`;

const StyledDRP = styled(DesktopDatePicker)`
  .MuiOutlinedInput-root {
    border-radius: 4px;
    background: ${colorFetch('background')};
    color: ${colorFetch('black')};
    border-radius: 16px;

    &:not(.Mui-error) {
      &:hover {
        fieldset {
          border-color: ${colorFetch('border')};
        }
      }
    }
  }

  .MuiPickersPopper-paper {
    background-color: transparent !important;
  }

  .MuiOutlinedInput-input {
    font-family: Gilroy600;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    padding: 12px 18px;

    ${media.phone} {
      padding: 12px;
    }
  }

  .Mui-focused {
    &:not(.Mui-error) {
      fieldset {
        border-color: ${colorFetch('border')};
      }
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${colorFetch('border')};
  }

  ${media.tabletPro} {
    flex: 1;
  }
`;

const slotsProps = {
  layout: {
    sx: {
      '.MuiDateCalendar-root': {
        color: `${colorFetch('white')}`,
        borderWidth: 0,
        borderColor: 'transparent',
        border: '0px solid',
        borderRadius: '16px',
        backgroundColor: `${colorFetch('white')}`,
      },
      '.MuiPickersCalendarHeader-labelContainer': {
        pointerEvents: 'none',
      },
      '.MuiPickersCalendarHeader-label': {
        color: `${colorFetch('gray')}`,
        fontFamily: 'Gilroy600',
        fontWeight: 600,
        lineHeight: 'normal',

        '&::first-letter': {
          textTransform: 'uppercase',
        },
      },
      '.MuiPickersCalendarHeader-switchViewButton': {
        color: `${colorFetch('white')}`,
        display: 'none',
        pointerEvents: 'none',
      },
      '.MuiPickersCalendarHeader-switchViewIcon': {
        color: `${colorFetch('black')}`,
      },
      '.MuiIconButton-root': {
        color: `${colorFetch('black')}`,

        '&.Mui-disabled': {
          color: `${colorFetch('gray1')}`,
          opacity: 0.3,
        },
      },
      '.MuiDayCalendar-weekDayLabel': {
        color: `${colorFetch('gray1')}`,
        fontFamily: 'Gilroy600',
        fontWeight: 600,
        lineHeight: 'normal',
      },

      '.MuiPickersDay-root': {
        color: `${colorFetch('black')}`,
        fontFamily: 'Gilroy600',
        fontWeight: 600,
        lineHeight: 'normal',

        '&.Mui-selected': {
          backgroundColor: `${colorFetch('green')} !important`,
          color: `${colorFetch('white')} !important`,
        },

        '&.Mui-disabled': {
          color: `${colorFetch('gray1')} !important`,
          opacity: 0.3,
        },
      },
      '.MuiPickersYear-yearButton': {
        color: `${colorFetch('black')}`,
        fontFamily: 'Gilroy600',
        fontWeight: 600,
        lineHeight: 'normal',

        '&.Mui-selected': {
          backgroundColor: `${colorFetch('green')} !important`,
          color: `${colorFetch('white')} !important`,
        },

        '&.Mui-disabled': {
          color: `${colorFetch('gray1')} !important`,
          opacity: 0.3,
        },
      },
    },
  },
};

interface HistoryDateRangePickerProps {
  startDate: any;
  setStartDate: any;
  endDate: any;
  setEndDate: any;
}

export const HistoryDateRangePicker: FC<HistoryDateRangePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DPContainer>
        <Label>Дата</Label>
        <DRPBox>
          <StyledDRP
            defaultValue={startDate}
            disableFuture
            disableHighlightToday
            format="DD.MM.YYYY"
            slots={{
              openPickerButton: StyledCalendarIcon,
            }}
            slotProps={slotsProps}
            value={startDate}
            onAccept={(value) => setStartDate(value)}
            shouldDisableDate={(day) => {
              return day > endDate;
            }}
          />
          <StyledDRP
            defaultValue={endDate}
            disableFuture
            disableHighlightToday
            format="DD.MM.YYYY"
            slots={{
              openPickerButton: StyledCalendarIcon,
            }}
            slotProps={slotsProps}
            value={endDate}
            onAccept={(value) => setEndDate(value)}
            shouldDisableDate={(day) => {
              return day < startDate;
            }}
          />
        </DRPBox>
      </DPContainer>
    </LocalizationProvider>
  );
};
