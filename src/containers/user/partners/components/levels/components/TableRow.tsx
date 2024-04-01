import { StyledDrawer } from '@components/index';
import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { colorFetch, media, useMediaType } from '@styles/index';
import { FC, useEffect, useState } from 'react';

const Wrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    width: calc(100% - 40px);
    background-color: ${colorFetch('border1')};
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;

    &::after {
      display: none;
    }
  }

  ${media.tabletPro} {
    &::after {
      width: calc(100% - 30px);
    }
  }

  ${media.tablet} {
    &::after {
      width: 100%;
    }
  }
`;

const CellText = styled.div`
  font-family: Gilroy500;
  font-size: 16px;
  line-height: 140%;
  color: ${colorFetch('gray1')};
`;

const TableRowTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 340,
    backgroundColor: colorFetch('white'),
    color: colorFetch('gray1'),
    borderRadius: '8px',
    padding: '10px 12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: colorFetch('white'),
  },
}));

const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TooltipTitle = styled.span`
  font-family: Gilroy700;
  font-size: 16px;
  color: ${colorFetch('black')};
`;

const TooltipText = styled.span`
  font-family: Gilroy500;
  font-size: 14px;
  color: ${colorFetch('gray1')};
`;

const DrawerTitle = styled.span`
  font-family: Gilroy700;
  font-size: 16px;
  color: ${colorFetch('black')};
`;

const DrawerText = styled.span`
  font-family: Gilroy500;
  font-size: 14px;
  color: ${colorFetch('gray1')};
`;

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  level: string;
  count_partners: string;
  volume: string;
  reward: string;
  isActive: boolean;
}

export const TableRow: FC<TableRowProps> = ({ level, count_partners, volume, reward, isActive, ...props }) => {
  const { tabletPro } = useMediaType();

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [tabletPro]);

  if (isActive) {
    return (
      <Wrapper {...props}>
        <CellText>{level}</CellText>
        <CellText>{count_partners}</CellText>
        <CellText>{volume}</CellText>
        <CellText>{reward}</CellText>
      </Wrapper>
    );
  }

  if (tabletPro) {
    return (
      <>
        <Wrapper onClick={() => setDrawerOpen(true)} {...props}>
          <CellText>{level}</CellText>
          <CellText>{count_partners}</CellText>
          <CellText>{volume}</CellText>
          <CellText>{reward}</CellText>
        </Wrapper>
        <StyledDrawer anchor={'bottom'} open={drawerOpen} onClose={() => setDrawerOpen((prev) => !prev)}>
          <DrawerTitle>Уровни неактивны</DrawerTitle>
          <DrawerText>Увеличьте сумму своей инвестции, чтобы получать прибыль с этих уровней</DrawerText>
          <Buttons buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={() => setDrawerOpen(false)}>
            Закрыть
          </Buttons>
        </StyledDrawer>
      </>
    );
  }

  return (
    <TableRowTooltip
      placement="right"
      title={
        <TooltipWrapper>
          <TooltipTitle>Уровни неактивны</TooltipTitle>
          <TooltipText>Увеличьте сумму своей инвестции, чтобы получать прибыль с этих уровней</TooltipText>
        </TooltipWrapper>
      }
      arrow
    >
      <Wrapper {...props}>
        <CellText>{level}</CellText>
        <CellText>{count_partners}</CellText>
        <CellText>{volume}</CellText>
        <CellText>{reward}</CellText>
      </Wrapper>
    </TableRowTooltip>
  );
};
