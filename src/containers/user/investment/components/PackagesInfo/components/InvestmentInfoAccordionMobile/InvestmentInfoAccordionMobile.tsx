import { DrawerHeading, StyledDrawer } from '@components/drawer';
import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import { colorFetch } from '@styles/index';
import { FC, Fragment, useState } from 'react';
import { ButtonsTypes } from '@enums/index';

import { ReactComponent as PlusIcon } from '@assets/images/activePackage/plus.svg';
import { ReactComponent as MinusIcon } from '@assets/images/activePackage/minus.svg';

const InvestmentInfoBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 20px;
  gap: 12px;
  border-radius: 24px;
  background: ${colorFetch('white')};
`;

const HeadingBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const HeadingText = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy800;
  font-size: 16px;
  font-weight: 800;
  line-height: normal;
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 26px;
  height: 26px;
`;

const StyledMinusIcon = styled(MinusIcon)`
  width: 26px;
  height: 26px;
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
    background-color: ${({ showAfter }) => (showAfter ? `${colorFetch('border1')}` : 'transparent')};
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
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const ContentText = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
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

  return (
    <InvestmentInfoBox>
      {closedArr.map((el: any, i: number) => (
        <Fragment key={i + el.period}>
          <HeadingBox>
            <HeadingText>{el.period}</HeadingText>

            {!isOpenDrawer ? <StyledPlusIcon onClick={() => setIsOpenDrawer(true)} /> : <StyledMinusIcon />}
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
            {!i && el.period && <DrawerHeading>{`Контракт инвестиций на ${el.period}`}</DrawerHeading>}
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
        <Buttons buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={() => setIsOpenDrawer(false)}>
          Закрыть
        </Buttons>
      </StyledDrawer>
    </InvestmentInfoBox>
  );
};
