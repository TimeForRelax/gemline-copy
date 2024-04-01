import styled from '@emotion/styled';
import { Box, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { colorFetch } from '@styles/index';
import { FC } from 'react';
import { ActivePckgBoxText } from '../../PackagesInfo';

import { ReactComponent as HelpCircleIcon } from '@assets/images/activePackage/help-circle.svg';

const ActivePckgBox = styled(Box)`
  min-height: 85px;
  display: grid;
  grid-template-columns: repeat(5, 1fr) 40px;
  gap: 20px;
  padding: 20px 30px;
  border-radius: 24px;
  background: ${colorFetch('green')};
`;

const StyledHelpCircleIcon = styled(HelpCircleIcon)`
  width: 32px;
  height: 32px;
  align-self: center;
  justify-self: 'center';
  cursor: pointer;

  & g path {
    fill: ${colorFetch('white')};
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

interface ActivePackageProps {
  convertedPromoPackage: any;
}

export const ActivePackage: FC<ActivePackageProps> = ({ convertedPromoPackage }) => {
  const { title, amount, day_profit, month_profit, year_profit } = convertedPromoPackage ?? {};

  return (
    <ActivePckgBox>
      <ActivePckgBoxText className="package">{title ? title : ''}</ActivePckgBoxText>
      <ActivePckgBoxText className="package">{amount ? amount : ''}</ActivePckgBoxText>
      <ActivePckgBoxText className="package">{day_profit ? day_profit : ''}</ActivePckgBoxText>
      <ActivePckgBoxText className="package">{month_profit ? month_profit : ''}</ActivePckgBoxText>
      <ActivePckgBoxText className="package">{year_profit ? year_profit : ''}</ActivePckgBoxText>
      <HelpTooltip
        placement="top"
        title={
          'Промо-пакет GEMLINE — предложение для новых инвесторов, которое поможет понять принципы работы нашей инвестиционной платформы и оценить потенциал доходности'
        }
      >
        <StyledHelpCircleIcon />
      </HelpTooltip>
    </ActivePckgBox>
  );
};
