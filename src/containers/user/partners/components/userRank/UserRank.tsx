import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LinearProgress } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC, useMemo } from 'react';

import { Buttons } from '@components/index';
import { ButtonsTypes } from '@enums/index';
import { getPath, View } from '@routes/index';
import { useNavigate } from 'react-router-dom';
import { decimal } from 'src/consts';

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};
  margin-bottom: 22px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;

  ${media.tabletPro} {
    grid-template-columns: 1fr 2fr;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const blockCss = css`
  background-color: ${colorFetch('white')};
  border-radius: 24px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;

  ${media.phone} {
    padding: 20px;
  }
`;

const CurrentRank = styled.div`
  ${blockCss}
  grid-area: 1/1/span 2/1;
  align-items: center;

  &.noRank {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  ${media.tabletPro} {
    grid-area: 1/1 / span 2/1;
  }

  ${media.tablet} {
    grid-area: auto;
    /* flex-direction: row-reverse; */
    justify-content: space-between;
  }
`;

// const StyledRankIcon = styled(RankIcon)`
//   max-width: 140px;
//   width: 100%;
//   height: auto;
//   margin-bottom: 12px;

//   ${media.tablet} {
//     max-width: 80px;
//     margin-bottom: 0;
//   }
// `;

const AltIcon = styled.span`
  font-family: Gilroy600;
  font-size: 18px;
  text-align: center;
  color: ${colorFetch('gray1')};
`;

const StyledButtons = styled(Buttons)`
  padding: 8px 12px;
  border-radius: 10px;
  background-color: ${colorFetch('green_background')};
  color: ${colorFetch('green')};

  &:hover {
    background-color: ${colorFetch('green') + '4C'};
    color: ${colorFetch('green')};
  }
`;

const CurrentRankName = styled.span`
  font-family: Gilroy700;
  font-size: 18px;
  text-align: center;
  color: ${colorFetch('black')};

  ${media.tablet} {
    font-size: 20px;
  }
`;

const Reward = styled.div`
  ${blockCss}
  gap: 6px;
`;

const RewardText = styled.span`
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};

  &.lastRang {
    color: ${colorFetch('gray1')};
    font-size: 20px;
  }
`;

const NextRank = styled.div`
  ${blockCss}
  gap: 6px;
`;

const NextRankName = styled.span`
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};

  &.lastRang {
    color: ${colorFetch('gray1')};
    font-size: 20px;
  }
`;

const Label = styled.span`
  font-family: Gilroy500;
  font-size: 18px;
  color: ${colorFetch('gray')};
`;

const ProgressBlock = styled.div`
  ${blockCss}
  padding: 30px;
  grid-area: 2/2/2 / span 2;

  ${media.tabletPro} {
    grid-area: 3/1/3 / span 2;
  }

  ${media.tablet} {
    grid-area: auto;
  }
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 36px;
  position: relative;
  z-index: 2;
`;

const StyledLineProgress = styled(LinearProgress)`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  flex-shrink: 0;
  background-color: ${colorFetch('background')};
  border-radius: 50px;

  &.lastRang {
    .MuiLinearProgress-bar {
      background-color: ${colorFetch('green')};
      border-radius: 50px;
    }
  }

  .MuiLinearProgress-bar {
    background-color: ${colorFetch('blue')};
    border-radius: 50px;
  }

  ${media.tablet} {
    height: 36px;
  }
`;

const CurrentValue = styled.span`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: inline-block;
  font-family: Gilroy600;
  font-size: 16px;
  color: ${colorFetch('white')};

  &.inactive {
    color: ${colorFetch('gray1')};
  }
`;

const FinishValue = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: inline-block;
  font-family: Gilroy600;
  font-size: 16px;
  color: ${colorFetch('gray1')};

  &.active {
    color: ${colorFetch('white')};
  }
`;

interface UserRankProps {
  ranks?: any[];
  userRankData: any;
}

export const UserRank: FC<UserRankProps> = ({ ranks, userRankData }) => {
  const navigate = useNavigate();

  const currentRank = ranks.filter(({ id }: any) => id === userRankData?.data.RankId)[0] ?? {};

  const nextRank = ranks.filter(({ id }: any) => id === userRankData?.data.RankId + 1)[0] ?? {};

  const progressValue = useMemo(() => {
    if (!userRankData?.data?.Volume && currentRank.id === 1 && !currentRank.volume) return 0;
    if (currentRank.id === 11 || !nextRank.volume) return 100;
    const currentProgressValue = BigInt(userRankData?.data.Volume) / decimal;
    const startProgressValue = BigInt(currentRank.volume ?? 0);
    const finishProgressValue = BigInt(nextRank.volume ?? 0);
    const hundredPersentProgress = finishProgressValue - startProgressValue;

    return Number(((currentProgressValue - startProgressValue) * BigInt(100)) / hundredPersentProgress);
  }, [userRankData?.data, currentRank, nextRank]);

  return (
    <Wrapper>
      <Title>Ваш ранг</Title>
      <Content>
        <CurrentRank className={!currentRank.icon && !currentRank.name && 'noRank'}>
          {/* <StyledRankIcon /> */}
          {currentRank.icon ? currentRank.icon : <AltIcon>У вас пока нет ранга</AltIcon>}
          {currentRank.name ? (
            <CurrentRankName>{currentRank.name}</CurrentRankName>
          ) : (
            <StyledButtons
              buttonType={ButtonsTypes.CONTAINED_GREEN}
              onClick={() => {
                navigate(getPath(View.USER_INVESTMENT));
              }}
            >
              Инвестировать
            </StyledButtons>
          )}
        </CurrentRank>
        <NextRank>
          <Label>Следующий ранг:</Label>
          <NextRankName className={currentRank.id === 11 && 'lastRang'}>
            {currentRank.id !== 11 ? `${nextRank?.name ?? ''}` : 'У вас максимальный ранг'}
          </NextRankName>
        </NextRank>
        <Reward>
          <Label>Награда</Label>
          <RewardText className={currentRank.id === 11 && 'lastRang'}>
            {currentRank.id !== 11 ? `$ ${Number(nextRank.reward).toFixed(2) ?? '0.00'}` : 'Награды получены'}
          </RewardText>
        </Reward>

        <ProgressBlock>
          <ProgressWrapper>
            <StyledLineProgress
              variant="determinate"
              value={progressValue}
              className={currentRank.id === 11 && 'lastRang'}
            />
            {currentRank.id !== 11 && (
              <CurrentValue className={BigInt(userRankData?.data.Volume ?? 0) === BigInt(0) && 'inactive'}>
                {currentRank.id === 1 ? 0 : `$ ${currentRank.volume}`}
              </CurrentValue>
            )}
            <FinishValue className={progressValue >= 90 && 'active'}>
              {currentRank.id !== 11 ? `$ ${nextRank.volume ?? 0}` : 'Max'}
            </FinishValue>
          </ProgressWrapper>
        </ProgressBlock>
      </Content>
    </Wrapper>
  );
};
