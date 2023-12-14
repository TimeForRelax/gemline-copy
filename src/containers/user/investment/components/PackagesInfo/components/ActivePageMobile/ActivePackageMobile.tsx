import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { DrawerButton, DrawerContentText, DrawerHeading, StyledDrawer } from '@components/drawer/index';
import Typography from '@mui/material/Typography';
import { colorFetch, media, theme } from '@styles/index';

import { ReactComponent as HelpCircleIcon } from '@assets/images/activePackage/help-circle.svg';

const ActivePckgBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 12px;
  background: ${colorFetch('green')({ theme })};
`;

const HeadingBox = styled(Box)`
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

const StyledHelpCircleIcon = styled(HelpCircleIcon)`
  align-self: center;
  cursor: pointer;
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
  color: ${colorFetch('white')({ theme })};
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

interface ActivePackageMobileProps { }

export const ActivePackageMobile: FC<ActivePackageMobileProps> = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <ActivePckgBox>
      <HeadingBox>
        <HeadingText>Пакет «Промо» на 1 месяц</HeadingText>
        <StyledHelpCircleIcon onClick={() => setIsOpen(true)} />
      </HeadingBox>
      <InvestmentContentBox>
        <ContentHeadingText>Сумма инвестиции</ContentHeadingText>
        <ContentText>$150 – $499</ContentText>
      </InvestmentContentBox>
      <InvestmentContentWrapper>
        <InvestmentContentBox>
          <ContentHeadingText>% прибыли за день</ContentHeadingText>
          <ContentText>1</ContentText>
        </InvestmentContentBox>
        <InvestmentContentBox>
          <ContentHeadingText>% за месяц</ContentHeadingText>
          <ContentText>30</ContentText>
        </InvestmentContentBox>
        <InvestmentContentBox>
          <ContentHeadingText>% за год</ContentHeadingText>
          <ContentText>360</ContentText>
        </InvestmentContentBox>
      </InvestmentContentWrapper>
      <StyledDrawer anchor={'bottom'} open={open} onClose={() => setIsOpen((prev) => !prev)}>
        <DrawerHeading>Пакет «Промо» на 1 месяц</DrawerHeading>
        <DrawerContentText>
          Промо-пакет GEMLINE — предложение для новых инвесторов, которое поможет понять принципы работы нашей
          инвестиционной платформы и оценить потенциал доходности
        </DrawerContentText>
        <DrawerButton variant="contained" onClick={() => setIsOpen(false)}>
          Закрыть
        </DrawerButton>
      </StyledDrawer>
    </ActivePckgBox>
  );
};
