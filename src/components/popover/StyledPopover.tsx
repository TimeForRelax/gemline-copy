import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { colorFetch, theme } from '@styles/index';
import { Box, Popover, Typography } from '@mui/material';

const PopoverContent = styled(Box)`
  display: flex;
  width: 340px;
  height: 96px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${colorFetch('bright_gray')};
  box-shadow: 0px 8px 20px 0px ${colorFetch('popover_box_shadow')};
`;

const PopoverContentText = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy600;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

const StyledPopoverBox = styled(Popover)`
  .MuiPopover-paper {
    background-color: ${colorFetch('bright_gray')};
    border-radius: 8px;
  }
`;

interface StyledPopoverProps {
  open: boolean;
  anchorEl: any;
  handlePopoverClose: () => void;
  text: string;
}

export const StyledPopover: FC<StyledPopoverProps> = ({ open, anchorEl, handlePopoverClose, text }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('custom-overflow');
    } else {
      document.body.classList.remove('custom-overflow');
    }

    return () => {
      document.body.classList.remove('custom-overflow');
    };
  }, [open]);

  return (
    <StyledPopoverBox
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      disableRestoreFocus
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <PopoverContent>
        <PopoverContentText>{text}</PopoverContentText>
      </PopoverContent>
    </StyledPopoverBox>
  );
};
