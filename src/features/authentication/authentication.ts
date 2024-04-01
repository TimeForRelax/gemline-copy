import { cs, ls } from '@utils/index';
import { LANDING_URL, SIGNIN_URL } from 'src/consts';
import { LsValueType } from '@enums/index';

export const logOut = () => {
  ls.remove(LsValueType.token);
  ls.remove(LsValueType.user_id);

  cs.remove(LsValueType.token);
  cs.remove(LsValueType.user_id);

  window.location.href = `${SIGNIN_URL}`;
};

export const redirectToLanding = () => {
  ls.remove(LsValueType.token);
  ls.remove(LsValueType.user_id);

  cs.remove(LsValueType.token);
  cs.remove(LsValueType.user_id);

  window.location.href = `${LANDING_URL}`;
};
