import styled from '@emotion/styled';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import React, { FC } from 'react';

interface UniversalInputProps {
  name: string;
  label: string;
  placeholder: string;
  rules: any;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  type: string;
  error: boolean;
  helperText: string | undefined;
  disabled?: boolean;
}

const InputBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NotRequiredLabelBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled(InputLabel)`
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;

  &.disabled {
    opacity: 0.4;
  }

  ${media.phone} {
    font-size: 14px;
  }
`;

const LabelNotReqDesc = styled(Typography)`
  color: ${colorFetch('gray')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 16px;
    background: ${colorFetch('white')};
    color: ${colorFetch('black')};

    &:not(.Mui-error) {
      &:hover {
        fieldset {
          border-color: ${colorFetch('border')};
        }
      }
    }

    &.Mui-disabled {
      pointer-events: none;
      background-color: ${colorFetch('white')};
      -webkit-text-fill-color: ${colorFetch('black')};

      .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${colorFetch('border')};
      }
    }
  }

  .MuiOutlinedInput-input {
    font-family: Gilroy600;
    font-size: 16px;
    line-height: normal;

    &:hover,
    &:focus {
      &[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    &.Mui-disabled {
      -webkit-text-fill-color: ${colorFetch('black')};
      opacity: 0.4;
    }
  }

  .Mui-focused {
    &:not(.Mui-error) {
      &:focus-within {
        fieldset {
          border-color: ${colorFetch('border')};
        }
      }
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${colorFetch('border')};
  }
`;

export const UniversalInput: FC<UniversalInputProps> = ({
  name,
  label,
  placeholder,
  rules,
  startAdornment,
  endAdornment,
  type,
  error,
  helperText,
  disabled,
  ...props
}) => {
  const { required } = rules;

  return (
    <InputBox {...props}>
      {label && (
        <NotRequiredLabelBox>
          <Label htmlFor={name} className={disabled ? 'disabled' : ''}>
            {label}
          </Label>
          {!!required && <LabelNotReqDesc>Необязательно</LabelNotReqDesc>}
        </NotRequiredLabelBox>
      )}
      <StyledTextField
        {...rules}
        placeholder={placeholder}
        type={type ? type : 'text'}
        InputProps={{
          endAdornment: endAdornment,
          startAdornment: startAdornment,
        }}
        error={error}
        helperText={helperText}
        id={name}
        disabled={disabled ? disabled : false}
        {...props}
      />
    </InputBox>
  );
};
