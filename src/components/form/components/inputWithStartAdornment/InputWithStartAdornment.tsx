import { UniversalInput } from "@components/form/common/universalInput/UniversalInput";
import { FC, ReactNode } from "react";

interface InputWithStartAdornmentProps {
  rules: any;
  type: string;
  startAdornment: ReactNode;
  name: string;
  label: string;
  placeholder: string;
  error: boolean;
  helperText: string | undefined;
}

export const InputWithStartAdornment: FC<InputWithStartAdornmentProps> = ({
  ...props
}) => {
  return <UniversalInput {...props} />;
};
