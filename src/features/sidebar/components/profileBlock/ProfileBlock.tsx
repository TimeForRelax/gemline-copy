import styled from '@emotion/styled';
import { logOut } from '@features/index';
import { getPath, View } from '@routes/index';
import { colorFetch } from '@styles/index';
import { useViewMatch } from '@utils/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as LogOutIcon } from '@assets/images/sidebar/profile/log_out.svg';
import { ReactComponent as UserIcon } from '@assets/images/sidebar/profile/user_icon.svg';
import { useGlobalState } from 'src/globalContext';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr 24px;
  align-items: center;
  justify-items: center;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colorFetch('white')};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
  padding: 20px 30px;
  transition: background-color 0.2s linear;

  &.active {
    & span {
      cursor: default;
      color: ${colorFetch('blue')};
    }
  }
`;

const StyledUserIcon = styled(UserIcon)`
  cursor: pointer;
`;

const Text = styled.span`
  cursor: pointer;
  font-family: Gilroy600;
  font-size: 16px;
  color: ${colorFetch('gray')};
  justify-self: start;
  transition: color 0.2s linear;

  &:hover {
    color: ${colorFetch('blue')};
  }
`;

const StyledLogOutIcon = styled(LogOutIcon)`
  cursor: pointer;

  & g path {
    transition: all 0.2s linear;
  }

  &:hover {
    & g path {
      stroke: ${colorFetch('red')};
    }
  }
`;

interface ProfileBlockProps {}

export const ProfileBlock: FC<ProfileBlockProps> = () => {
  const { userName } = useGlobalState();

  const navigate = useNavigate();

  const matchPath = useViewMatch();

  const handleLogOut = (e: any) => {
    e.stopPropagation();

    logOut();
  };

  const handleGoToProfile = () => {
    navigate(getPath(View.USER_PROFILE));
  };

  return (
    <Wrapper className={matchPath(View.USER_PROFILE as any) ? 'active' : ''}>
      <StyledUserIcon onClick={handleGoToProfile} />
      <Text onClick={handleGoToProfile}>{userName}</Text>
      <StyledLogOutIcon onClick={handleLogOut} />
    </Wrapper>
  );
};
