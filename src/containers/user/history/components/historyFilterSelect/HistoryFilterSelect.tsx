import { ReactComponent as ShevronDown } from '@assets/images/common/chevron_down.svg';
import styled from '@emotion/styled';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';
import { selectOptions } from '../../data/data';

const StyledFormControl = styled(FormControl)`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-self: flex-end;
  gap: 11px;

  ${media.tabletPro} {
    justify-self: flex-start;
    width: calc(50% - 12px);
  }

  ${media.phone} {
    width: 100%;
  }
`;

export const Label = styled(Box)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  color: ${colorFetch('black')};
  font-family: Gilroy600;
  font-size: 16px;
  line-height: 22px;
  border: 1px solid ${colorFetch('border')};
  border-radius: 16px;
  background: ${colorFetch('background')};

  &:hover {
    border-color: ${colorFetch('border')};
  }

  .MuiOutlinedInput-input {
    padding: 12px 18px;

    ${media.phone} {
      padding: 12px;
    }
  }

  .MuiSelect-icon {
    right: 18px;

    ${media.phone} {
      right: 12px;
    }
  }

  fieldset {
    display: none;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  color: ${colorFetch('black')};
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  padding: 12px 18px;

  &:hover {
    background-color: ${colorFetch('background')};
    color: ${colorFetch('green')};
  }

  &.Mui-selected {
    background-color: ${colorFetch('green_background')};
    color: ${colorFetch('green')};

    &:hover {
      background-color: ${colorFetch('green_background')};
    }
  }
`;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '200px',
      backgroundColor: `${colorFetch('white')}`,
      borderRadius: '16px',
    },
  },
};

interface HistoryFilterSelectProps {
  reward: string;
  setReward: any;
}

export const HistoryFilterSelect: FC<HistoryFilterSelectProps> = ({ reward, setReward }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setReward(event.target.value as string);
  };
  return (
    <StyledFormControl>
      <Label component={'span'}>Действия</Label>
      <StyledSelect
        value={reward}
        onChange={handleChange}
        variant="outlined"
        IconComponent={ShevronDown}
        MenuProps={MenuProps}
      >
        <StyledMenuItem value="0">Все действия</StyledMenuItem>
        {Object.keys(selectOptions).map((option) => {
          return (
            <StyledMenuItem value={option} key={option}>
              {selectOptions[option]}
            </StyledMenuItem>
          );
        })}
      </StyledSelect>
    </StyledFormControl>
  );
};
