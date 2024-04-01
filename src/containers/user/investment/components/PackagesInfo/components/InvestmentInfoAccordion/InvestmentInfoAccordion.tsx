import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FC, useState } from 'react';
import { ActivePckgBoxText } from '../../PackagesInfo';

import { ReactComponent as MinusIcon } from '@assets/images/activePackage/minus.svg';
import { ReactComponent as PlusIcon } from '@assets/images/activePackage/plus.svg';

const StyledAccordion = styled(Accordion)<{ expanded?: boolean }>`
  border-radius: 24px;
  background: ${colorFetch('white')};
  box-shadow: none;

  &:before {
    display: none;
  }

  .MuiSvgIcon-root {
    width: 26px;
    height: 26px;
    fill: ${colorFetch('white')};
  }

  .MuiAccordionSummary-root {
    padding: 12px 30px;

    ${media.tabletPro} {
      padding: 12px 20px;
    }

    &.Mui-expanded {
      min-height: max-content;
      padding: 12px 30px;
      position: relative;

      &:not(:last-child):after {
        content: '';
        display: ${({ expanded }) => (expanded ? 'block' : 'none')};
        width: calc(100% - 60px);
        height: 1px;
        background-color: ${colorFetch('border1')};
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        ${media.tabletPro} {
          width: calc(100% - 40px);
        }
      }

      ${media.tabletPro} {
        padding: 12px 20px;
      }
    }
  }

  .MuiAccordionSummary-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr) 0;
    gap: 20px;
    margin: 0;
    &.Mui-expanded {
      margin: 0;
    }
  }

  &.Mui-expanded {
    margin: 0;
  }

  .MuiAccordionDetails-root {
    display: grid;
    grid-template-columns: repeat(5, 1fr) 40px;
    gap: 20px;
    padding: 12px 30px;
    position: relative;

    &:not(:last-child):after {
      content: '';
      display: ${({ expanded }) => (expanded ? 'block' : 'none')};
      width: calc(100% - 60px);
      height: 1px;
      background-color: ${colorFetch('border1')};
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);

      ${media.tabletPro} {
        width: calc(100% - 40px);
      }
    }

    ${media.tabletPro} {
      padding: 12px 20px;
    }
  }

  &:last-of-type {
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
`;

interface InvestmentInfoAccordionProps {
  id: any;
  period: any;
  closedValues: any;
  openedValues: any;
}

export const InvestmentInfoAccordion: FC<InvestmentInfoAccordionProps> = ({
  id,
  period,
  closedValues,
  openedValues,
}) => {
  const [expanded, setExpanded] = useState<boolean>(period === '1 месяц' ? true : false);

  const closedArr = [{ period, ...closedValues }];
  const openedArr = openedValues.map((el: any, index: number) =>
    index === 0 ? { period, ...el } : { period: '', ...el },
  );

  const actualArr = expanded ? openedArr : closedArr;

  return (
    <StyledAccordion expanded={expanded}>
      {actualArr.map((item: any, index: number) => {
        return index === 0 ? (
          <AccordionSummary
            expandIcon={expanded ? <MinusIcon /> : <PlusIcon />}
            aria-controls="panel1a-content"
            id={item.id}
            onClick={() => setExpanded((prev: boolean) => !prev)}
            key={index + item.period}
          >
            <ActivePckgBoxText className="period">{item.period}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.amount}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.day_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.month_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.year_profit}</ActivePckgBoxText>
          </AccordionSummary>
        ) : (
          <AccordionDetails key={index + item.period}>
            <ActivePckgBoxText className="period">{!index && item.period}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.amount}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.day_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.month_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.year_profit}</ActivePckgBoxText>
          </AccordionDetails>
        );
      })}
    </StyledAccordion>
  );
};
