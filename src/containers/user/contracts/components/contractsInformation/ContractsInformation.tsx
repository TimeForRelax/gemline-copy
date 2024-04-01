import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';
import { ContractFinantialInfo } from './components/contractFinantialInfo/ContractFinantialInfo';
import { ContractRemaineProgress } from './components/contractRemaineProgress/ContractRemaineProgress';
import { EmptyContracts } from './components/emptyContracts/EmptyContracts';

const ContractsInformationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContractsInformationItem = styled(Box)`
  width: 100%;
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 24px;
  background-color: ${colorFetch('white')};

  ${media.tablet} {
    padding: 20px;
  }

  &.active {
    &.promo {
      .MuiLinearProgress-bar {
        background-color: ${colorFetch('green')};
      }
    }
    .MuiLinearProgress-bar {
      background-color: ${colorFetch('blue1')};
    }
  }

  &.completed {
    .MuiLinearProgress-bar {
      background-color: ${colorFetch('green')};
    }
  }
`;

const CIItemHeading = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;

  &.promo {
    color: ${colorFetch('green')};
  }

  ${media.tablet} {
    font-size: 16px;
  }
`;

const CIItemContentBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

interface ContractsInformationProps {
  alignment: string;
  contracts: Record<any, any>[];
}

export const ContractsInformation: FC<ContractsInformationProps> = ({ alignment, contracts }) => {
  const calculateProgress = (remainingDays: number, totalDays: number) => {
    return ((totalDays - remainingDays) / totalDays) * 100;
  };

  const getActiveStageIndex = (remainingDays: number, totalDays: number, length: number) => {
    const progress = calculateProgress(remainingDays, totalDays);
    return progress >= 100 ? Math.floor(99.9 / (100 / length)) : Math.floor(progress / (100 / length));
  };

  return (
    <ContractsInformationBox>
      {alignment === 'active' && !contracts.length ? (
        <EmptyContracts />
      ) : (
        contracts.map((el: any) => (
          <ContractsInformationItem key={el.contactNumber} className={`${alignment} ${el.pckgId === 1 ? 'promo' : ''}`}>
            <CIItemHeading className={el.pckgId === 1 ? 'promo' : ''}>
              {el.pckgId === 1 ? 'Пакет «Промо»' : `Контракт #${el.contactNumber}`}
            </CIItemHeading>
            <CIItemContentBox>
              <ContractFinantialInfo
                investments={el.investments}
                term={el.term}
                percentage={el.dailyProfit.percentage}
                amount={el.dailyProfit.amount}
              />
              <ContractRemaineProgress
                pckgId={el.pckgId}
                remainingDays={el.remainingDays}
                currentProgress={el.progress.current}
                totalProgress={el.progress.total}
                progressValue={calculateProgress(el.remainingDays, el.totalDays)}
                stages={el.stages}
                activeStageIndex={getActiveStageIndex(el.remainingDays, el.totalDays, el.stages.length)}
                alignment={alignment}
              />
            </CIItemContentBox>
          </ContractsInformationItem>
        ))
      )}
    </ContractsInformationBox>
  );
};
