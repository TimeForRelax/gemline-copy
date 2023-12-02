import ReactDOM from "react-dom/client";
import { StyleContextProvider } from "@styles/index";
import "@styles/global.css";

import { AuthenticationLayout, UserLayout } from "@layouts/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StyleContextProvider>
    <AuthenticationLayout />
    {/* <UserLayout /> */}
  </StyleContextProvider>
);
