import { ButtonsTypes } from '@enums/index';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { UniversalButton } from './components/universalButton/UniversalButton';

interface ButtonsComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonsTypes;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  ref?: any;
  props?: any;
}

export const Buttons: FC<ButtonsComponentProps> = ({ buttonType, children, ...props }) => {
  const dataButtons = {
    [ButtonsTypes.CONTAINED_GREEN]: () => (
      <UniversalButton
        variant="contained"
        color={'white'}
        backgroundColor={'green'}
        backgroundColorHover={'light_green_hover'}
        {...props}
      >
        {children}
      </UniversalButton>
    ),
    [ButtonsTypes.CONTAINED_GRAY]: () => (
      <UniversalButton
        variant="contained"
        color={'black'}
        backgroundColor={'background'}
        backgroundColorHover={'background_hover'}
        {...props}
      >
        {children}
      </UniversalButton>
    ),
    [ButtonsTypes.CONTAINED_WHITE]: () => (
      <UniversalButton
        variant="contained"
        color={'green'}
        backgroundColor={'white'}
        backgroundColorHover={'green_background'}
        {...props}
      >
        {children}
      </UniversalButton>
    ),
    [ButtonsTypes.CONTAINED_LIGHT_RED]: () => (
      <UniversalButton
        variant="contained"
        color={'red1'}
        backgroundColor={'red_background'}
        backgroundColorHover={'red_background'}
        {...props}
      >
        {children}
      </UniversalButton>
    ),
  };

  return dataButtons[buttonType]();
};
