import { FC, ReactNode } from 'react';
import { StyledDrawerBox } from './index';

interface StyledDrawerProps {
  anchor: 'top' | 'right' | 'bottom' | 'left' | undefined;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const StyledDrawer: FC<StyledDrawerProps> = ({ anchor, open, onClose, children }) => {
  return (
    <StyledDrawerBox anchor={anchor} open={open} onClose={onClose}>
      {children}
    </StyledDrawerBox>
  );
};
