import { useMediaType } from "@styles/style.context";
import React, { FC } from "react";
// @ts-ignore
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const Exm = styled.div`
//   width: 500px;
//   height: 500px;
//   background-color: #fff;
//   border: 1px solid black;
// `;

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  // const { tablet } = useMediaType();

  return <Wrapper>{/* <img src={logo} /> */}</Wrapper>;
};
