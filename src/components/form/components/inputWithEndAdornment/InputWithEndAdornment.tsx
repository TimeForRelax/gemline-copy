import { FC, InputHTMLAttributes, ReactNode } from 'react';
import { UniversalInput } from '../../common/universalInput/UniversalInput';

interface InputWithEndAdornmentProps extends InputHTMLAttributes<HTMLInputElement> {
  rules: any;
  type: string;
  endAdornment: ReactNode;
  name: string;
  label: string;
  placeholder: string;
  error: boolean;
  helperText: string | undefined;
}

export const InputWithEndAdornment: FC<InputWithEndAdornmentProps> = ({ ...props }) => {
  return <UniversalInput {...props} />;
};
