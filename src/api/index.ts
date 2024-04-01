import { useValidateJWT } from './authentication/validateJWT';
import { useInvestPackages } from './investment/getInvestmentPackages';
import { useInvestToPackage } from './investment/investToPackage';
import { useAllRanks } from './partners/getAllRanks';
import { useInviterName } from './partners/getInviterName';
import { useLevel } from './partners/getLevel';
import { useRefferalReward } from './partners/getRefferalReward';
import { useTableLevel } from './partners/getTableLevel';
import { useUserRank } from './partners/getUserRank';
import { useRefCode } from './user/getRefCode';
import { useUserEmail } from './user/getUserEmail';
import { useUserName } from './user/getUserName';
import { useDepositWallet } from './withoutToken/depositWallet';
import { useBalance } from './withoutToken/getBalance';
import { useContracts } from './withoutToken/getContracts';
import { useRegistrationDate } from './withoutToken/getRegistrationDate';
import { useUpdatePassword } from './user/updatePassword';
import { useUpdateName } from './user/updateName';
import { useReferralStructure } from './partners/getReferralStructure';

export {
  useValidateJWT,
  useDepositWallet,
  useBalance,
  useInvestPackages,
  useInvestToPackage,
  useRegistrationDate,
  useContracts,
  useUserName,
  useRefCode,
  useUserRank,
  useRefferalReward,
  useInviterName,
  useAllRanks,
  useLevel,
  useTableLevel,
  useUserEmail,
  useUpdateName,
  useUpdatePassword,
  useReferralStructure,
};
