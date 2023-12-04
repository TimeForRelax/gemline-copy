import { ResetPasswordForm } from "@containers/authentication/resetPassword/components/resetPasswordForm/ResetPasswordForm";
import { AuthenticationWrapper } from "@styles/index";
import { FC } from "react";

interface ResetPasswordProps {}

export const ResetPassword: FC<ResetPasswordProps> = () => {
  return (
    <AuthenticationWrapper>
      <ResetPasswordForm />
    </AuthenticationWrapper>
  );
};
