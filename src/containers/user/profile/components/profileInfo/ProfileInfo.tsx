import { useUserRank } from '@api/index';
import { ranksSkeleton } from '@containers/common/data';
import styled from '@emotion/styled';
import { css } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC, useMemo } from 'react';
import { IFormInput } from '../../Profile';

import { ReactComponent as ShowHidePass } from '@assets/images/common/show_hide_password.svg';

const ProfileInfoContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;

  ${media.phone} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const StyledCard = styled.div`
  background-color: ${colorFetch('background')};
  border-radius: 24px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.password,
  &.level {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Label = styled.span`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
`;

const Text = styled.span`
  color: ${colorFetch('black')};
  font-family: Gilroy600;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
`;

const commonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PasswordWrapper = styled.div`
  ${commonWrapper}
`;

const LevelWrapper = styled.div`
  ${commonWrapper}
`;

const StyledShowHidePass = styled(ShowHidePass)`
  cursor: pointer;

  & g path {
    fill: ${colorFetch('gray1')};
    transition: all 0.2s linear;
  }

  &.active {
    & g {
      opacity: 1;
    }

    & g path {
      fill: ${colorFetch('green')};
    }
  }

  &:hover {
    & g path {
      fill: ${colorFetch('green')};
    }
  }
`;

const StyledRankIcon = styled.div`
  & svg {
    width: 46px;
    height: 46px;
  }
`;

interface ProfileInfoProps {
  defaultValues: IFormInput;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ defaultValues }) => {
  const { name, email } = defaultValues;

  const { data: userRankData } = useUserRank();

  const rank = useMemo(() => {
    const rankId = userRankData?.data.RankId;
    return rankId && rankId - 2 < 0 ? { icon: null, name: 'Нет ранга' } : ranksSkeleton[rankId - 2];
  }, [userRankData?.data]);

  // const [isShowPass, setIsShowPass] = useState<boolean>(false);

  return (
    <ProfileInfoContent>
      <StyledCard>
        <Label>Имя:</Label>
        <Text>{name}</Text>
      </StyledCard>
      <StyledCard className="level">
        <LevelWrapper>
          <Label>Уровень:</Label>
          {rank?.name && <Text>{rank.name}</Text>}
        </LevelWrapper>
        {rank?.icon && <StyledRankIcon>{rank.icon}</StyledRankIcon>}
      </StyledCard>
      {/* <StyledCard className="password">
        <PasswordWrapper>
          <Label>Пароль:</Label>
          <Text>{isShowPass ? password : '*'.repeat(password.length)}</Text>
        </PasswordWrapper>

        <StyledShowHidePass className={isShowPass && 'active'} onClick={() => setIsShowPass((prev) => !prev)} />
      </StyledCard> */}
      <StyledCard>
        <Label>E-mail:</Label>
        <Text>{email}</Text>
      </StyledCard>
    </ProfileInfoContent>
  );
};
