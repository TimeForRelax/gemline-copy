import { UniversalInput } from "@components/form/common/universalInput/UniversalInput";
import { FC } from "react";

interface InputProps {
  rules: any;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  error: boolean;
  helperText: string | undefined;
}

export const Input: FC<InputProps> = ({ ...props }) => {
  return <UniversalInput {...props} />;
};
