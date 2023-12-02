import { Body, SideBar, Wrapper } from "@layouts/elements/elements";
import { FC } from "react";

interface UserLayoutProps {}

export const UserLayout: FC<UserLayoutProps> = () => {
  return (
    <Wrapper>
      <SideBar>MENU</SideBar>
      <Body>BODY</Body>
    </Wrapper>
  );
};
