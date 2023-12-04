import { UniversalInput } from "@components/form/common/universalInput/UniversalInput";
import { FC, ReactNode } from "react";

interface InputWithEndAdornmentProps {
  rules: any;
  type: string;
  endAdornment: ReactNode;
  name: string;
  label: string;
  placeholder: string;
  error: boolean;
  helperText: string | undefined;
}

export const InputWithEndAdornment: FC<InputWithEndAdornmentProps> = ({
  ...props
}) => {
  return <UniversalInput {...props} />;
};
