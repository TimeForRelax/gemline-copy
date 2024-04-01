import { formatDays } from '@containers/user/investment/utils/utils';
import styled from '@emotion/styled';
import { Box, LinearProgress, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';

const ContentRemaineBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;
const ContentRemaineHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentRemaineHeaderText = styled(Box)`
  color: ${colorFetch('black')};
  font-family: Gilroy600;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;

  &.remaining {
    color: ${colorFetch('gray1')};
  }

  ${media.tabletPro} {
    font-size: 16px;
  }
`;

const ContentRemaineProgressBox = styled(Box)`
  width: 100%;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50px;
  position: relative;

  ${media.phone} {
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const ContentRemaineProgressStages = styled(Box)`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const ContentStagesLabelBox = styled(Box)<{ bgFn: () => Record<string, string>; alignment: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 0 24px 24px 0;
  background-color: ${({ bgFn, alignment }) => (alignment === 'active' ? bgFn().bgColor : '#2DBB6E')};

  &:first-child {
    border-radius: 24px;
  }

  &:last-child {
    border-radius: ${({ alignment }) => (alignment === 'active' ? '0 24px 24px 0' : '24px')};
    &::before {
      border-radius: ${({ alignment }) => (alignment === 'active' ? '0 24px 24px 0' : '24px')};
    }
  }

  &::before {
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${({ bgFn, alignment }) => (alignment === 'active' ? bgFn().bgBeforeColor : '#2DBB6E')};
    position: absolute;
    z-index: -1;
    border-radius: 24px 0 0 24px;
  }
`;

const ContentStagesLabel = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy600;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;

  ${media.tabletPro} {
    font-size: 14px;
  }

  ${media.phone} {
    font-size: 12px;
  }
`;

const StyledLineProgress = styled(LinearProgress)`
  width: 100%;
  height: 36px;
  flex-shrink: 0;
  background-color: #e3e3e4; /* ${colorFetch('background')} Поменять*/
  border-radius: 50px;

  .MuiLinearProgress-bar {
    border-radius: 50px;
  }
`;

interface ContractRemaineProgressProps {
  remainingDays: number;
  currentProgress: string;
  totalProgress: string;
  progressValue: number;
  stages: string[];
  activeStageIndex: number;
  alignment: string;
  pckgId: number;
}

export const ContractRemaineProgress: FC<ContractRemaineProgressProps> = ({
  remainingDays,
  currentProgress,
  totalProgress,
  progressValue,
  stages,
  activeStageIndex,
  alignment,
  pckgId,
}) => {
  const getBgColors = (activeStageIndex, index) => {
    const length = stages.length;
    if (activeStageIndex === 0) {
      if (index === 0 && length === 1) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
      if (index === 0) return { bgColor: colorFetch('blue2'), bgBeforeColor: 'transparent' };
      if (index === 1) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
      if (index === 2) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
      if (index === 3) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
    }
    if (activeStageIndex === 1) {
      if (index === 0)
        return {
          bgColor: colorFetch('blue3'),
          bgBeforeColor: length === 2 ? 'transparent' : colorFetch('blue2'),
        };
      if (index === 1 && length === 2) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
      if (index === 1) return { bgColor: colorFetch('blue2'), bgBeforeColor: 'transparent' };
      if (index === 2) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
      if (index === 3) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
    }
    if (activeStageIndex === 2) {
      if (index === 0) return { bgColor: colorFetch('blue3'), bgBeforeColor: colorFetch('blue2') };
      if (index === 1)
        return { bgColor: colorFetch('blue2'), bgBeforeColor: length === 3 ? 'transparent' : colorFetch('blue1') };
      if (index === 2 && length === 3) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
      if (index === 2) return { bgColor: colorFetch('blue1'), bgBeforeColor: 'transparent' };
      if (index === 3) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
    }
    if (activeStageIndex === 3) {
      if (index === 0) return { bgColor: colorFetch('blue4'), bgBeforeColor: colorFetch('blue3') };
      if (index === 1) return { bgColor: colorFetch('blue3'), bgBeforeColor: colorFetch('blue2') };
      if (index === 2)
        return { bgColor: colorFetch('blue2'), bgBeforeColor: length === 4 ? 'transparent' : colorFetch('blue1') };
      if (index === 3) return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
    }
    if (activeStageIndex === 4) {
      return { bgColor: 'transparent', bgBeforeColor: 'transparent' };
    }
  };

  return (
    <ContentRemaineBox>
      <ContentRemaineHeader>
        <ContentRemaineHeaderText className="remaining">
          {!remainingDays ? 'Завершено' : `Осталось ${remainingDays} ${formatDays(remainingDays)}`}
        </ContentRemaineHeaderText>
        <ContentRemaineHeaderText>
          {currentProgress}$ / {totalProgress}$
        </ContentRemaineHeaderText>
      </ContentRemaineHeader>
      <ContentRemaineProgressBox>
        <StyledLineProgress variant="determinate" value={progressValue} />
        <ContentRemaineProgressStages>
          {stages.map((stage: string, index: number) => {
            return (
              <ContentStagesLabelBox bgFn={() => getBgColors(activeStageIndex, index)} alignment={alignment}>
                <ContentStagesLabel
                  style={{
                    color: activeStageIndex >= index ? colorFetch('white') : colorFetch('black') + '4C',
                  }}
                >
                  {pckgId === 1 ? '' : stage}
                </ContentStagesLabel>
              </ContentStagesLabelBox>
            );
          })}
        </ContentRemaineProgressStages>
      </ContentRemaineProgressBox>
    </ContentRemaineBox>
  );
};
