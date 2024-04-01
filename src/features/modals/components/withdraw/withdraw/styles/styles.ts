import { Buttons, Input } from '@components/index';
import styled from '@emotion/styled';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';

export const WithdrawalForm = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
`;

export const WithdrawalBox = styled(Box)`
  width: 100%;
  background-color: ${colorFetch('background')};
  padding: 20px 30px;

  ${media.phone} {
    padding: 20px;
  }
`;

export const EndAdornmentTypography = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-right: 20px;
`;

export const AmountAndErrorBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0 0 0;
  margin-bottom: 20px;
`;

export const AllAmountText = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  border-radius: 30px;
  background: ${colorFetch('gray1')};
  padding: 6px 12px;
  cursor: pointer;

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }
`;

export const ErrorText = styled(Typography)`
  color: ${colorFetch('red')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  ${media.phone} {
    font-size: 14px;
  }
`;

export const WithdrawalInfoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  row-gap: 20px;
  column-gap: 110px;
  flex-wrap: wrap;
`;

export const WithdrawalInfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const WithdrawalInfoHeading = styled(Typography)`
  color: ${colorFetch('white_seashell')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  ${media.phone} {
    font-size: 14px;
  }
`;

export const WithdrawalInfoAmount = styled(Typography)`
  color: ${colorFetch('white_seashell')};
  font-family: Gilroy700;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;

  ${media.phone} {
    font-size: 20px;
  }
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  border-radius: 0;
  justify-content: center;
  width: 100%;

  ${media.phone} {
    width: 100%;
  }
`;

export const ToggleButtonsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 30px 0px 30px;

  ${media.phone} {
    width: 100%;
    padding: 0 20px 0 20px;
  }
`;

export const LabelText = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;

  ${media.phone} {
    font-size: 14px;
  }
`;

export const ErrorSmsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-area: smsError;
`;

export const SmsHelperText = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
`;

export const StyledToggleButton = styled(ToggleButton)`
  &.MuiToggleButton-root {
    flex: 1 auto;
    border-radius: 8px;
    border: none;
    color: ${colorFetch('black')};
    font-family: Gilroy600;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    text-transform: initial;
    background-color: ${colorFetch('background')};
    padding: 12px;

    ${media.phone} {
      width: auto;
      flex: 1;
      font-size: 14px;
    }

    &.Mui-selected {
      color: ${colorFetch('white')};
      background-color: ${colorFetch('black')};
      opacity: 1;
      border-top-right-radius: 8px !important;
      border-bottom-right-radius: 8px !important;
      border-top-left-radius: 8px !important;
      border-bottom-left-radius: 8px !important;
      pointer-events: none;
    }

    .MuiTouchRipple-root {
      display: none;
    }

    &.Mui-disabled {
      opacity: 0.5;
    }
  }
`;

export const InputWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  padding: 0 30px 0px 30px;
  row-gap: 12px;
  column-gap: 20px;

  ${media.phone} {
    padding: 0 20px 0 20px;
  }

  &.email-code {
    grid-template-columns: 1fr 0.5fr;
    grid-template-areas:
      'input button'
      'smsError smsError';
    border-bottom: none;
    column-gap: 8px;
    ${media.phone} {
      grid-template-columns: 1fr 0.5fr;
      padding-bottom: 0;
    }
  }

  &.footer {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: none;
    border-bottom: none;

    ${media.phone} {
      grid-template-columns: repeat(1, 1fr);
      padding-bottom: 0;
    }
  }
`;

export const ButtonsWrapper = styled(Box)`
  width: 100%;
  display: flex;
  border-bottom: none;
  padding: 0 30px 30px 30px;
  row-gap: 12px;
  column-gap: 20px;

  ${media.phone} {
    flex-direction: column;
    padding: 0 20px 20px 20px;
  }
`;

export const StyledInput = styled(Input)`
  grid-area: input;
`;

export const StyledCodeButton = styled(Buttons)`
  width: max-content;
  height: 56px;
  padding: 17px 0;
  font-weight: 600;
  align-self: end;
  width: 100%;
  border-radius: 8px;
  grid-area: button;

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  ${media.phone} {
    font-size: 16px;
    padding: 8px;
  }
`;
