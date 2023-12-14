import styled from '@emotion/styled';
import { getPath, View } from '@routes/index';
import { colorFetch, theme } from '@styles/index';
import { useViewMatch } from '@utils/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as UserIcon } from '@assets/images/sidebar/profile/user_icon.svg';
import { ReactComponent as HoveredUserIcon } from '@assets/images/sidebar/profile/active_user_icon.svg';
import { ReactComponent as LogOutIcon } from '@assets/images/sidebar/profile/log_out.svg';
import { ReactComponent as HoveredLogOutIcon } from '@assets/images/sidebar/profile/active_log_out.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr 24px;
  align-items: center;
  justify-items: center;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
  padding: 20px 30px;
  transition: background-color 0.2s linear;

  & .active_icon,
  & .active_icon_logout {
    display: none;
  }

  &.active {
    background-color: ${colorFetch('blue')({ theme })};

    & .active_icon,
    & .active_icon_logout {
      display: block;
    }

    & .icon,
    & .icon_logout {
      display: none;
    }

    & span {
      cursor: default;
      &:hover {
        color: ${colorFetch('white')({ theme })};
      }
    }
  }
`;

const StyledUserIcon = styled(UserIcon)`
  cursor: pointer;
`;

const StyledHoveredUserIcon = styled(HoveredUserIcon)`
  grid-area: 1/1/1/1;
`;

const Text = styled.span`
  cursor: pointer;
  font-family: Nunito600;
  font-size: 16px;
  color: ${colorFetch('white')({ theme })};
  justify-self: start;
  transition: color 0.2s linear;

  &:hover {
    color: ${colorFetch('blue')({ theme })};
  }
`;

const StyledLogOutIcon = styled(LogOutIcon)`
  cursor: pointer;

  & g path {
    transition: all 0.2s linear;
  }

  &:hover {
    & g path {
      stroke: #a3a3a3;
    }
  }
`;

const StyledHoveredLogOutIcon = styled(HoveredLogOutIcon)`
  cursor: pointer;
  grid-area: 1/3/1/3;
`;

interface ProfileBlockProps { }

export const ProfileBlock: FC<ProfileBlockProps> = () => {
  const navigate = useNavigate();

  const matchPath = useViewMatch();

  const handleLogOut = (e: any) => {
    e.stopPropagation();

    console.log('LOGOUT');
  };

  const handleGoToProfile = () => {
    console.log('PROFILECLICK');
    navigate(getPath(View.USER_PROFILE));
  };

  return (
    <Wrapper className={matchPath(View.USER_PROFILE as any) ? 'active' : ''}>
      <StyledUserIcon className={'icon'} onClick={handleGoToProfile} />
      <StyledHoveredUserIcon className={'active_icon'} />
      <Text onClick={handleGoToProfile}>Константин Вершигора</Text>
      <StyledLogOutIcon className={'icon_logout'} onClick={handleLogOut} />
      <StyledHoveredLogOutIcon className={'active_icon_logout'} onClick={handleLogOut} />
    </Wrapper>
  );
};
