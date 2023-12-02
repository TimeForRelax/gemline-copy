import { ForgotPassword, Login, Register } from "@containers/index";
import { Body, Wrapper } from "@layouts/elements/elements";
import { FC } from "react";

interface AuthenticationLayoutProps {}

export const AuthenticationLayout: FC<AuthenticationLayoutProps> = () => {
  return (
    <Wrapper isAuth>
      <Body>
        <Login />
        <Register />
        <ForgotPassword />
      </Body>
    </Wrapper>
  );
};
