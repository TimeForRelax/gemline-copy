import { SuccessScreen } from "@components/index";
import { FC } from "react";

interface FinishResetPasswordProps {}

export const FinishResetPassword: FC<FinishResetPasswordProps> = () => {
  return (
    <SuccessScreen
      heading={"Сброс пароля отправлен"}
      subHeading={
        "Мы отправили инструкцию по восстановлению пароля на ваш E-mail. Проверьте почту"
      }
      btnText={"Войти"}
    />
  );
};
