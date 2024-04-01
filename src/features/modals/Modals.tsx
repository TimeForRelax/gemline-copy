import { ModalsTypes } from '@enums/index';
import { createContext, FC } from 'react';
import {
  Invest,
  InvestError,
  InvestSuccess,
  ReplenishAccount,
  Withdraw,
  WithdrawSuccess,
  WithdrawVerification,
  WithdrawVerificationSuccess,
} from './index';
interface ModalsProps {
  type: ModalsTypes;
  onClose: (e: any) => void;
  otherProps?: any;
}

export const ModalsCtx = createContext(null);

export const Modals: FC<ModalsProps> = ({ type, onClose, otherProps }) => {
  const dataModals = {
    [ModalsTypes.REPLENISH_ACCOUNT]: <ReplenishAccount onClose={onClose} />,
    [ModalsTypes.INVEST]: <Invest onClose={onClose} />,
    [ModalsTypes.INVEST_SUCCESS]: <InvestSuccess onClose={onClose} />,
    [ModalsTypes.INVEST_ERROR]: <InvestError onClose={onClose} />,
    [ModalsTypes.WITHDRAW]: <Withdraw onClose={onClose} />,
    [ModalsTypes.WITHDRAW_SUCCESS]: <WithdrawSuccess onClose={onClose} />,
    [ModalsTypes.WITHDRAW_VERIFICATION]: <WithdrawVerification onClose={onClose} />,
    [ModalsTypes.WITHDRAW_VERIFICATION_SUCCESS]: <WithdrawVerificationSuccess onClose={onClose} />,
  };

  return <ModalsCtx.Provider value={otherProps}>{dataModals[type]}</ModalsCtx.Provider>;
};
