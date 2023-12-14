import { ActivePckgBoxText } from '@containers/user/investment/Invesment';
import styled from '@emotion/styled';
import { Box, Popover, Typography } from '@mui/material';
import { colorFetch, theme } from '@styles/index';
import { FC, useState } from 'react';
import { data } from './data/data';

import { ReactComponent as HelpCircleIcon } from '@assets/images/activePackage/help-circle.svg';

const ActivePckgBox = styled(Box)`
  min-height: 85px;
  display: grid;
  grid-template-columns: repeat(5, 1fr) 26px;
  gap: 20px;
  padding: 20px 30px;
  border-radius: 12px;
  background: ${colorFetch('green')({ theme })};
`;

const StyledHelpCircleIcon = styled(HelpCircleIcon)`
  align-self: center;
  cursor: pointer;
`;

const PopoverContent = styled(Box)`
  display: flex;
  width: 340px;
  height: 96px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${colorFetch('bright_gray')({ theme })};
  box-shadow: 0px 8px 20px 0px ${colorFetch('popover_box_shadow')({ theme })};
`;

const PopoverContentText = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito600;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    background-color: ${colorFetch('bright_gray')({ theme })};
    border-radius: 8px;
  }
`;

interface ActivePackageProps { }

export const ActivePackage: FC<ActivePackageProps> = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ActivePckgBox>
      {data.map((text: string, i: number) => (
        <ActivePckgBoxText key={i}>{text}</ActivePckgBoxText>
      ))}
      <StyledHelpCircleIcon
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <StyledPopover
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
          <PopoverContentText>
            Промо-пакет GEMLINE — предложение для новых инвесторов, которое поможет понять принципы работы нашей
            инвестиционной платформы и оценить потенциал доходности
          </PopoverContentText>
        </PopoverContent>
      </StyledPopover>
    </ActivePckgBox>
  );
};
