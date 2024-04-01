import { Buttons, DrawerContentText, DrawerHeading, StyledDrawer } from '@components/index';
import styled from '@emotion/styled';
import { Box, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import { colorFetch, media, useMediaType } from '@styles/index';
import { FC, useState } from 'react';

import { ReactComponent as InfoIcon } from '@assets/images/activePackage/help-circle.svg';
import { ButtonsTypes } from '@enums/index';

const FinancialSummaryItemBox = styled(Box)`
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  padding: 20px 30px;
  border-radius: 24px;
  background: ${colorFetch('white')};
  flex: 1;

  ${media.tablet} {
    padding: 12px 20px;
    min-width: 160px;
  }
`;

const FinancialSummaryItemHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FinancialSummaryItemHeading = styled(Typography)`
  color: ${colorFetch('gray')};
  font-family: Gilroy500;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;

  ${media.tablet} {
    font-size: 14px;
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;

  & g path {
    fill: ${colorFetch('gray1')};
    transition: all 0.2s linear;
  }

  &:hover {
    & g path {
      fill: ${colorFetch('green')};
    }
  }
`;

const FinancialSummaryItemAmountBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const FinancialSummaryItemAmount = styled(Typography)`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 30px;
  font-weight: 700;
  line-height: normal;

  ${media.tablet} {
    font-size: 20px;
  }
`;

const FinancialSummaryItemAmountDate = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy700;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;

  ${media.tablet} {
    font-family: Gilroy500;
    font-weight: 400;
  }
`;

const HelpTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 340,
    backgroundColor: colorFetch('white'),
    color: colorFetch('gray1'),
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    padding: '10px 12px',
    fontFamily: 'Gilroy500',
    fontSize: '14px',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
}));

interface FinantialSummaryItemProps {
  heading: string;
  amount: string;
  infoText: string;
  dateTo: string;
}

export const FinantialSummaryItem: FC<FinantialSummaryItemProps> = ({ heading, amount, infoText, dateTo }) => {
  const { tabletPro } = useMediaType();
  const [open, setIsOpen] = useState(false);

  return (
    <FinancialSummaryItemBox>
      <FinancialSummaryItemHeader>
        <FinancialSummaryItemHeading>{heading}</FinancialSummaryItemHeading>
        {infoText && (
          <HelpTooltip placement="top" title={<>{infoText}</>}>
            <StyledInfoIcon
              onClick={() => {
                tabletPro && setIsOpen(true);
              }}
            />
          </HelpTooltip>
        )}
      </FinancialSummaryItemHeader>
      <FinancialSummaryItemAmountBox>
        <FinancialSummaryItemAmount>{amount}</FinancialSummaryItemAmount>
        <FinancialSummaryItemAmountDate>{dateTo}</FinancialSummaryItemAmountDate>
      </FinancialSummaryItemAmountBox>

      <StyledDrawer anchor={'bottom'} open={tabletPro && open} onClose={() => setIsOpen((prev) => !prev)}>
        <DrawerHeading>Ожидаемая прибыль</DrawerHeading>
        <DrawerContentText>{infoText}</DrawerContentText>
        <Buttons buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={() => setIsOpen(false)}>
          Закрыть
        </Buttons>
      </StyledDrawer>
    </FinancialSummaryItemBox>
  );
};
