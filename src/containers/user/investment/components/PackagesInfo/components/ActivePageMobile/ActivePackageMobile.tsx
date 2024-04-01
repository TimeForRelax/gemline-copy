import { DrawerContentText, DrawerHeading, StyledDrawer } from '@components/drawer/index';
import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { colorFetch, media } from '@styles/index';
import { FC, useState } from 'react';

import { ReactComponent as HelpCircleIcon } from '@assets/images/activePackage/help-circle.svg';

const ActivePckgBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 24px;
  background: ${colorFetch('green')};
`;

const HeadingBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const HeadingText = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy800;
  font-size: 16px;
  font-weight: 800;
  line-height: normal;
`;

const StyledHelpCircleIcon = styled(HelpCircleIcon)`
  align-self: center;
  cursor: pointer;
  width: 26px;
  height: 26px;

  & g path {
    fill: ${colorFetch('white')};
  }
`;

const InvestmentContentWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  gap: 50px;

  ${media.phone} {
    gap: 6px;
    justify-content: space-between;
  }
`;

const InvestmentContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ContentHeadingText = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy500;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const ContentText = styled(Typography)`
  color: ${colorFetch('white')};
  font-family: Gilroy700;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
`;

interface ActivePackageMobileProps {
  convertedPromoPackage: any;
}

export const ActivePackageMobile: FC<ActivePackageMobileProps> = ({ convertedPromoPackage }) => {
  const [open, setIsOpen] = useState(false);
  const { title, amount, day_profit, month_profit, year_profit } = convertedPromoPackage ?? {};

  return (
    <ActivePckgBox>
      <HeadingBox>
        <HeadingText>{title ? title : ''}</HeadingText>
        <StyledHelpCircleIcon onClick={() => setIsOpen(true)} />
      </HeadingBox>
      <InvestmentContentBox>
        <ContentHeadingText>Сумма инвестиции</ContentHeadingText>
        <ContentText>{amount ? amount : ''}</ContentText>
      </InvestmentContentBox>
      <InvestmentContentWrapper>
        <InvestmentContentBox>
          <ContentHeadingText>% прибыли за день</ContentHeadingText>
          <ContentText>{day_profit ? day_profit : ''}</ContentText>
        </InvestmentContentBox>
        <InvestmentContentBox>
          <ContentHeadingText>% за месяц</ContentHeadingText>
          <ContentText>{month_profit ? month_profit : ''}</ContentText>
        </InvestmentContentBox>
        <InvestmentContentBox>
          <ContentHeadingText>% за год</ContentHeadingText>
          <ContentText>{year_profit ? year_profit : ''}</ContentText>
        </InvestmentContentBox>
      </InvestmentContentWrapper>
      <StyledDrawer anchor={'bottom'} open={open} onClose={() => setIsOpen((prev) => !prev)}>
        <DrawerHeading>Пакет «Промо» на 1 месяц</DrawerHeading>
        <DrawerContentText>
          Промо-пакет GEMLINE — предложение для новых инвесторов, которое поможет понять принципы работы нашей
          инвестиционной платформы и оценить потенциал доходности
        </DrawerContentText>
        <Buttons buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={() => setIsOpen(false)}>
          Закрыть
        </Buttons>
      </StyledDrawer>
    </ActivePckgBox>
  );
};
