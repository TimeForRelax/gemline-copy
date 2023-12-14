import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FC, useState } from 'react';
import { ActivePckgBoxText } from '../../../../Invesment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colorFetch, media, theme } from '@styles/index';

const StyledAccordion = styled(Accordion)`
  border-radius: 12px;
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px ${colorFetch('shadow_gray')({ theme })} inset;

  .MuiAccordionSummary-expandIconWrapper {
    background: ${colorFetch('green')({ theme })};
    border-radius: 4px;
    transform: rotate(0deg);

    &:hover {
      background: ${colorFetch('light_green_hover')({ theme })};
    }

    &.Mui-expanded {
      transform: rotate(0deg);

      > svg {
        transform: rotate(180deg);
      }
    }
  }

  .MuiSvgIcon-root {
    width: 26px;
    height: 26px;
    fill: ${colorFetch('white')({ theme })};
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
        width: calc(100% - 60px);
        height: 1px;
        background-color: ${colorFetch('trout_gray')({ theme })};
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
    grid-template-columns: repeat(5, 1fr) 26px;
    gap: 20px;
    padding: 12px 30px;
    position: relative;

    &:not(:last-child):after {
      content: '';
      width: calc(100% - 60px);
      height: 1px;
      background-color: ${colorFetch('trout_gray')({ theme })};
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
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
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
  const [expanded, setExpanded] = useState<boolean>(id === 0 ? true : false);

  const closedArr = [{ period, ...closedValues }];
  const openedArr = openedValues.map((el: any, index: number) =>
    index === 0 ? { period, ...el } : { period: '', ...el },
  );

  const actualArr = expanded ? openedArr : closedArr;

  return (
    <StyledAccordion expanded={expanded}>
      {actualArr.map((item: any, index: number) =>
        index === 0 ? (
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={item.id}
            onClick={() => setExpanded((prev: boolean) => !prev)}
            key={index + item.period}
          >
            <ActivePckgBoxText>{item.period}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.amount}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.day_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.month_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.year_profit}</ActivePckgBoxText>
          </AccordionSummary>
        ) : (
          <AccordionDetails key={index + item.period}>
            <ActivePckgBoxText>{item.period}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.amount}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.day_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.month_profit}</ActivePckgBoxText>
            <ActivePckgBoxText>{item.year_profit}</ActivePckgBoxText>
          </AccordionDetails>
        ),
      )}
    </StyledAccordion>
  );
};
