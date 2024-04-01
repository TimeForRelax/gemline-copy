import { useAllRanks, useReferralStructure, useUserRank } from '@api/index';
import { Footer } from '@components/index';
import { ranksSkeleton } from '@containers/common/data';
import { ContentWrapper, Heading, Wrapper } from '@containers/common/styles';
import { convertBigMoney } from '@utils/convertTo';
import BigNumber from 'bignumber.js';
import { FC, useMemo } from 'react';
import { decimal } from 'src/consts';
import { AllRanks } from './components/allRanks/AllRanks';
import { Levels } from './components/levels/Levels';
import { UserInfo } from './components/userInfo/UserInfo';
import { UserRank } from './components/userRank/UserRank';

interface PartnersProps {}

export const Partners: FC<PartnersProps> = () => {
  const { data: userRankData, isSuccess: isUserRankSuccess } = useUserRank();

  const { data: allRanks, isSuccess: isAllRanksSuccess } = useAllRanks();

  const ranks =
    (allRanks?.data &&
      allRanks?.data.map(({ ID, RequiredAmount, RewardAmount }: any) => ({
        id: ID,
        icon: ID - 2 >= 0 ? ranksSkeleton[ID - 2]?.icon : null,
        title: `Ранг ${ID - 1}`,
        name: ID - 2 >= 0 ? ranksSkeleton[ID - 2]?.name : null,
        reward: BigInt(RewardAmount) / decimal,
        volume: BigInt(RequiredAmount) / decimal,
      }))) ??
    [];

  const { data: referralStructure, isSuccess: isReferralStructureSuccess } = useReferralStructure();

  const commonInfo = useMemo(() => {
    const { TotalRewardAmount, TotalVolume, TotalLengthOfUsers } = referralStructure?.data ?? {};

    return {
      totalReward: TotalRewardAmount ? convertBigMoney(TotalRewardAmount) : '0.00',
      totalVolume: TotalVolume ? convertBigMoney(TotalVolume) : '0.00',
      totalUsers: TotalLengthOfUsers ?? 0,
    };
  }, [referralStructure?.data]);

  const tableContent = useMemo(() => {
    const { LevelInfo } = referralStructure?.data ?? {};

    return LevelInfo?.length > 0
      ? LevelInfo.map((el: any, i: number) => {
          return {
            level: i + 1,
            count_partners: el.LengthOfUsers,
            volume: `$ ${el.Volume ? convertBigMoney(el.Volume) : '0.00'}`,
            reward: `$ ${el.RewardAmount ? convertBigMoney(el.RewardAmount) : '0.00'}`,
          };
        })
      : [];
  }, [referralStructure?.data]);

  const ranksReward = useMemo(() => {
    let ranksRewardSumm = BigNumber('0');

    const currentRank = ranks.filter(({ id }: any) => id === userRankData?.data.RankId)[0] ?? {};
    ranks.forEach(({ id, reward }: any) => {
      id <= currentRank?.id && (ranksRewardSumm = ranksRewardSumm.plus(BigNumber(reward)));
    });
    return ranksRewardSumm;
  }, [ranks, userRankData?.data?.RankId]);

  if (!isUserRankSuccess || !isAllRanksSuccess || !isReferralStructureSuccess) return;

  return (
    <Wrapper>
      <ContentWrapper>
        <Heading>Партнерская программа</Heading>
        <UserInfo ranksReward={ranksReward} />
        <UserRank ranks={ranks} userRankData={userRankData} />
        <AllRanks ranks={ranks} userRankData={userRankData} />
        <Levels commonInfo={commonInfo} tableContent={tableContent} />
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
