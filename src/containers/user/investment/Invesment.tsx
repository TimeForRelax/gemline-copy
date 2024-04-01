import { useContracts, useInvestPackages } from '@api/index';
import { Footer } from '@components/index';
import { ContentWrapper, Heading, Wrapper } from '@containers/common/styles';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { createContext, FC, useEffect, useMemo, useRef, useState } from 'react';
import { useGlobalState } from 'src/globalContext';
import { InvestmentPackageSelector, PackagesInfo } from './components/index';
import { getTimeRemaining } from './utils/utils';

const HeadingBottom = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 30px;

  ${media.phone} {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

interface InvestmentProps {}

export const RegDateCtx = createContext(null);

export const Investment: FC<InvestmentProps> = () => {
  const { promoStartDate } = useGlobalState();

  const intervalId = useRef(null);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(promoStartDate));

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimeRemaining(getTimeRemaining(promoStartDate));
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, [promoStartDate]);

  const { data: packagesData, isSuccess: isPackagesSuccess, isError: isPackagesError } = useInvestPackages();

  const { data: contractsData, isSuccess: isContractsSuccess, isError: isContractsError } = useContracts();

  const isShowPromoInfo = useMemo(
    () => contractsData?.isContracts && Object.values(timeRemaining).some((el) => Number(el) > 0),
    [contractsData?.isContracts, timeRemaining],
  );

  // useEffect(() => {
  //   !isShowPromoInfo && clearInterval(intervalId.current);
  // }, [isShowPromoInfo]);

  if ((!isPackagesSuccess && !isContractsSuccess) || (isPackagesError && isContractsError)) return;

  return (
    <Wrapper>
      <ContentWrapper>
        <RegDateCtx.Provider value={timeRemaining}>
          <Heading>Инвестиции</Heading>
          <PackagesInfo data={packagesData} isShowPromoInfo={isShowPromoInfo} />
          <HeadingBottom>Купить инвестпакет</HeadingBottom>
          <InvestmentPackageSelector data={packagesData} isShowPromoInfo={isShowPromoInfo} />
        </RegDateCtx.Provider>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
