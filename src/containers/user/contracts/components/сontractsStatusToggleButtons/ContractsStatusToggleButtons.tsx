import styled from '@emotion/styled';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  border-radius: 8px;
  margin-bottom: 30px;
  background-color: ${colorFetch('white')};

  ${media.phone} {
    width: 100%;
  }
`;

const StyledToggleButton = styled(ToggleButton)`
  &.MuiToggleButton-root {
    width: 175px;
    border-radius: 8px;
    border: none;
    color: ${colorFetch('black') + '4C'};
    opacity: 0.4;
    font-family: Gilroy600;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    text-transform: initial;
    background-color: ${colorFetch('white')};

    ${media.phone} {
      width: auto;
      flex: 1;
    }

    &.Mui-selected {
      color: ${colorFetch('white')};
      background-color: ${colorFetch('blue')};
      opacity: 1;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      pointer-events: none;
    }
  }
`;

interface ContractsStatusToggleButtonsProps {
  alignment: string;
  handleChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
}

export const ContractsStatusToggleButtons: FC<ContractsStatusToggleButtonsProps> = ({ alignment, handleChange }) => {
  return (
    <StyledToggleButtonGroup color="standard" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
      <StyledToggleButton value="active">Активные</StyledToggleButton>
      <StyledToggleButton value="completed">Завершенные</StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};
