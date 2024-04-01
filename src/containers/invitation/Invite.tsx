import { LoadingScreen } from '@features/index';
import { useGetQueryFromURL } from '@utils/index';
import { FC, useEffect } from 'react';
import { SIGNUP_URL } from 'src/consts';

interface InviteProps {}

export const Invite: FC<InviteProps> = () => {
  const queryParams = useGetQueryFromURL('ref');

  useEffect(() => {
    if (queryParams?.ref) {
      window.location.href = `${SIGNUP_URL}?ref=${queryParams.ref}`;
    }
  }, [queryParams.ref]);

  return <LoadingScreen />;
};
