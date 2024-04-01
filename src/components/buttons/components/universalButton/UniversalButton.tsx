import { Button } from '@mui/material';
import { colorFetch } from '@styles/index';
import { FC, ReactNode } from 'react';

interface UniversalButtonProps {
  variant: 'contained' | 'outlined';
  color: string;
  backgroundColor: string;
  backgroundColorHover: string;
  borderColor?: string;
  disabledColor?: string;
  children: ReactNode;
  props?: any;
  colorWhenHover?: string;
}

export const UniversalButton: FC<UniversalButtonProps> = ({
  variant,
  color,
  colorWhenHover,
  backgroundColor,
  backgroundColorHover,
  borderColor,
  children,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        textTransform: 'none',
        fontFamily: 'Gilroy600',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        fontStyle: 'normal',

        color: `${colorFetch(color)}`,
        backgroundColor: `${colorFetch(backgroundColor)}`,
        border: '1px solid transparent',
        borderColor: `${colorFetch(borderColor)}`,
        borderRadius: '16px',
        padding: '14px 32px',
        boxShadow: 'none',
        transition: 'all .2s easy-in-out',

        '&:hover': {
          backgroundColor: `${colorFetch(backgroundColorHover)}`,
          borderColor: `${colorFetch(borderColor)}`,
          color: colorWhenHover ? `${colorFetch(colorWhenHover)}` : `${colorFetch(color)}`,
          boxShadow: 'none',
        },

        '&:disabled': {
          backgroundColor: `${colorFetch(backgroundColor)}`,
          color: `${colorFetch(color)}`,
          opacity: 0.4,
        },
      }}
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
};
