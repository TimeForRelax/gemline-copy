// auth
import { Login } from '@containers/authentication/login/Login';
import { Registration } from '@containers/authentication/registration/Registration';
import { ForgotPassword } from '@containers/authentication/forgotPassword/ForgotPassword';
import { ResetPassword } from '@containers/authentication/resetPassword/ResetPassword';

// user
import { Profile } from '@containers/user/profile/Profile';
import { Contracts } from '@containers/user/contracts/Contracts';
import { Investment } from '@containers/user/investment/Invesment';
import { Partners } from '@containers/user/partners/Partners';
import { History } from '@containers/user/history/History';

// errors
import { Error404 } from '@containers/error/404/404';

export {
  Login,
  Registration,
  ForgotPassword,
  ResetPassword,
  //
  Profile,
  Contracts,
  Investment,
  Partners,
  History,
  //
  Error404,
};
