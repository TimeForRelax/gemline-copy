import { SuccessScreen } from "@components/index";
import { FC } from "react";

interface FinishRegistrationProps {}

export const FinishRegistration: FC<FinishRegistrationProps> = () => {
  return (
    <SuccessScreen
      heading={"Завершите регистрацию"}
      subHeading={
        "Мы отправили ссылку для подтверждения учетной записи на ваш E-mail. Проверьте почту"
      }
      btnText={"Вернуться на сайт"}
    />
  );
};
