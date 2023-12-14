import { DrawerButton, DrawerHeading, StyledDrawer } from '@components/drawer';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import { colorFetch, theme } from '@styles/index';
import { FC, Fragment, useState } from 'react';

const InvestmentInfoBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 20px;
  gap: 12px;
  border-radius: 12px;
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px ${colorFetch('shadow_gray')({ theme })} inset;
`;

const HeadingBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const HeadingText = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito800;
  font-size: 16px;
  font-weight: 800;
  line-height: normal;
`;

const StyledMoreIcon = styled(ExpandMoreIcon)`
  width: 26px;
  height: 26px;
  background: ${colorFetch('green')({ theme })};
  color: ${colorFetch('white')({ theme })};
  border-radius: 4px;

  &:hover {
    background: ${colorFetch('light_green_hover')({ theme })};
  }
`;

const InvestmentContentWrapper = styled(Box)`
  width: 100%;
  display: flex;
  gap: 6px;
  justify-content: space-between;
`;

const DrawerWrapperBox = styled(Box)<{ showAfter: boolean }>`
  gap: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({ showAfter }) => (showAfter ? `${colorFetch('trout_gray')({ theme })}` : 'transparent')};
    position: absolute;
    bottom: -10px;
    left: 0;
  }
`;

const InvestmentContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ContentHeadingText = styled(Typography)`
  color: ${colorFetch('silver_chalice')({ theme })};
  font-family: Nunito400;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const ContentText = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
`;

interface InvestmentInfoAccordionMobileProps {
  id: any;
  period: any;
  closedValues: any;
  openedValues: any;
}

export const InvestmentInfoAccordionMobile: FC<InvestmentInfoAccordionMobileProps> = ({
  id,
  period,
  closedValues,
  openedValues,
}) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const closedArr = [{ period, ...closedValues }];
  const openedArr = openedValues.map((el: any, index: number) =>
    index === 0 ? { period, ...el } : { period: '', ...el },
  );
  // const actualArr = expanded ? openedArr : closedArr;

  // console.log(closedArr, openedArr, id);

  return (
    <InvestmentInfoBox>
      {closedArr.map((el: any, i: number) => (
        <Fragment key={i + el.period}>
          <HeadingBox>
            <HeadingText>{el.period}</HeadingText>
            <StyledMoreIcon onClick={() => setIsOpenDrawer(true)} />
          </HeadingBox>
          <InvestmentContentBox>
            <ContentHeadingText>Сумма инвестиции</ContentHeadingText>
            <ContentText>{el.amount}</ContentText>
          </InvestmentContentBox>
          <InvestmentContentWrapper>
            <InvestmentContentBox>
              <ContentHeadingText>% прибыли за день</ContentHeadingText>
              <ContentText>{el.day_profit}</ContentText>
            </InvestmentContentBox>
            <InvestmentContentBox>
              <ContentHeadingText>% за месяц</ContentHeadingText>
              <ContentText>{el.month_profit}</ContentText>
            </InvestmentContentBox>
            <InvestmentContentBox>
              <ContentHeadingText>% за год</ContentHeadingText>
              <ContentText>{el.year_profit}</ContentText>
            </InvestmentContentBox>
          </InvestmentContentWrapper>
        </Fragment>
      ))}
      <StyledDrawer anchor="bottom" open={isOpenDrawer} onClose={() => setIsOpenDrawer((prev) => !prev)}>
        {openedArr.map((el: any, i: number) => (
          <DrawerWrapperBox key={i + el.period} showAfter={openedArr.length - 1 !== i}>
            {el.period && <DrawerHeading>{`Контракт инвестиций на ${el.period}`}</DrawerHeading>}
            <InvestmentContentBox>
              <ContentHeadingText>Сумма инвестиции</ContentHeadingText>
              <ContentText>{el.amount}</ContentText>
            </InvestmentContentBox>
            <InvestmentContentWrapper>
              <InvestmentContentBox>
                <ContentHeadingText>% прибыли за день</ContentHeadingText>
                <ContentText>{el.day_profit}</ContentText>
              </InvestmentContentBox>
              <InvestmentContentBox>
                <ContentHeadingText>% за месяц</ContentHeadingText>
                <ContentText>{el.month_profit}</ContentText>
              </InvestmentContentBox>
              <InvestmentContentBox>
                <ContentHeadingText>% за год</ContentHeadingText>
                <ContentText>{el.year_profit}</ContentText>
              </InvestmentContentBox>
            </InvestmentContentWrapper>
          </DrawerWrapperBox>
        ))}
        <DrawerButton variant="contained" onClick={() => setIsOpenDrawer(false)}>
          Закрыть
        </DrawerButton>
      </StyledDrawer>
    </InvestmentInfoBox>
  );
};
