import styled from '@emotion/styled';
import { Box, css } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';
import { useGlobalState } from 'src/globalContext';

import { ReactComponent as ProfileIcon } from '@assets/images/common/profile_icon.svg';

const ProfileFormHeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const commonCss = css`
  font-family: Gilroy600;
  font-size: 24px;
  font-style: normal;
  line-height: normal;
  color: ${colorFetch('black')};

  ${media.tablet} {
    font-size: 18px;
  }
`;

const Name = styled.span`
  ${commonCss}
`;

const Text = styled.span`
  ${commonCss}
`;

interface ProfileFormHeaderProps {
  name: string;
  isEditingForm: boolean;
}

export const ProfileFormHeader: FC<ProfileFormHeaderProps> = ({ name, isEditingForm }) => {
  const { userName } = useGlobalState();

  return (
    <ProfileFormHeaderBox>
      <ProfileIcon />
      {isEditingForm ? <Text>Редактирование профиля</Text> : <Name>{userName}</Name>}
    </ProfileFormHeaderBox>
  );
};
