import { FC, ReactNode } from 'react';
import { StyledDrawerBox } from './index';

interface StyledDrawerProps {
  anchor: 'top' | 'right' | 'bottom' | 'left' | undefined;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const StyledDrawer: FC<StyledDrawerProps> = ({ anchor, open, onClose, children, className, ...props }) => {
  return (
    <StyledDrawerBox anchor={anchor} open={open} onClose={onClose} className={className ? className : ''} {...props}>
      {children}
    </StyledDrawerBox>
  );
};
