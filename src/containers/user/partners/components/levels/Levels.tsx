import { useLevel } from '@api/index';
import { CardColorBorder } from '@components/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorFetch, media, useMediaType } from '@styles/index';
import { getTextWidth } from '@utils/index';
import { FC, useCallback, useState } from 'react';
import { TableRow } from './components/TableRow';

const Wrapper = styled.div``;

const Title = styled.h2`
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};
  margin-bottom: 30px;

  ${media.tabletPro} {
    margin-bottom: 20px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  ${media.tabletPro} {
    flex-direction: column-reverse;
  }
`;

const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  overflow-x: auto;

  ${media.tablet} {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const commonTableCss = css`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
  padding: 0 30px;

  ${media.tabletPro} {
    padding: 0 20px;
  }

  ${media.tablet} {
    padding: 0 10px;
  }
`;

const HeaderTable = styled.div<{
  minWidthLevels: number;
  minWidthCountPartners: number;
  minWidthVolume: number;
  minWidthReward: number;
}>`
  ${commonTableCss}
  grid-template-columns: ${({ minWidthLevels, minWidthCountPartners, minWidthVolume, minWidthReward }) =>
    `minmax(${minWidthLevels}px, 1fr) minmax(${minWidthCountPartners}px, 1fr) minmax(${minWidthVolume}px, 1fr) minmax(${minWidthReward}px, 1fr)`};
`;

const HeaderTitle = styled.span`
  font-family: Gilroy500;
  font-size: 16px;
  line-height: 140%;
  color: ${colorFetch('gray1')};

  ${media.phone} {
    line-height: 1;
    font-size: 12px;
  }
`;

const ContentTable = styled.div<{ isScrollable?: boolean }>`
  width: ${({ isScrollable }) => isScrollable && 'fit-content'};
  display: flex;
  flex-direction: column;
  background-color: ${colorFetch('white')};
  border-radius: 12px;
  padding-top: 20px;
  padding-bottom: 20px;

  ${media.tabletPro} {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  ${media.tablet} {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const StyledTableRow = styled(TableRow)<{
  minWidthLevels: number;
  minWidthCountPartners: number;
  minWidthVolume: number;
  minWidthReward: number;
}>`
  ${commonTableCss}
  grid-template-columns: ${({ minWidthLevels, minWidthCountPartners, minWidthVolume, minWidthReward }) =>
    `minmax(${minWidthLevels}px, 1fr) minmax(${minWidthCountPartners}px, 1fr) minmax(${minWidthVolume}px, 1fr) minmax(${minWidthReward}px, 1fr)`};
  padding-top: 12px;
  padding-bottom: 12px;

  &.active {
    & > span {
      color: ${colorFetch('black')};
    }
  }

  &.activeBorder {
    &::after {
      background-color: ${colorFetch('green')};
    }
  }

  ${media.tabletPro} {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  ${media.tablet} {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const CardsInfo = styled.div`
  flex: 1;
  margin-top: 34px;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: max-content;
  gap: 20px;

  ${media.tabletPro} {
    margin-top: 0;
  }
`;

const StyledCardColorBorder = styled(CardColorBorder)`
  padding: 20px 30px;
  height: max-content;

  ${media.phone} {
    padding: 20px;
  }
`;

const CardBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
`;

const Label = styled.span`
  font-family: Gilroy500;
  font-size: 16px;
  color: ${colorFetch('gray')};
`;

const CardText = styled.span`
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};
`;

interface LevelsProps {
  commonInfo: any;
  tableContent: any;
}

export const Levels: FC<LevelsProps> = ({ commonInfo, tableContent }) => {
  const [node, setNode] = useState(null);

  const tableContainerRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      setNode(node);
    }
  }, []);

  const tableHeader = ['Уровень', 'Партнеров', 'Объем', 'Награда'];

  const { tabletPro, tablet, phone } = useMediaType();

  const { data: levelData } = useLevel();

  const getMinWidth = (arr: string[]) => {
    return arr.reduce((acc, el, index) => {
      const fontStyle = !index && phone ? '500 12px Gilroy500' : '500 16px Gilroy500';

      const textWidth = getTextWidth(`${el}`, { font: fontStyle });

      return textWidth > acc ? textWidth : acc;
    }, 0);
  };

  const levelsArr = [tableHeader[0], ...tableContent.map((el) => el.level)];
  const countPartnersArr = [tableHeader[1], ...tableContent.map((el) => el.count_partners)];
  const volumeArr = [tableHeader[2], ...tableContent.map((el) => el.volume)];
  const rewardArr = [tableHeader[3], ...tableContent.map((el) => el.reward)];

  const addPaddings = tablet ? 20 : tabletPro ? 40 : 60;

  const minWidthTable =
    Math.ceil(getMinWidth(levelsArr)) +
    Math.ceil(getMinWidth(countPartnersArr)) +
    Math.ceil(getMinWidth(volumeArr)) +
    Math.ceil(getMinWidth(rewardArr)) +
    addPaddings +
    60;

  return (
    <Wrapper>
      <Title>Уровни партнерства</Title>
      <ContentContainer>
        <TableContainer ref={tableContainerRef}>
          <HeaderTable
            minWidthLevels={Math.ceil(getMinWidth(levelsArr))}
            minWidthCountPartners={Math.ceil(getMinWidth(countPartnersArr))}
            minWidthVolume={Math.ceil(getMinWidth(volumeArr))}
            minWidthReward={Math.ceil(getMinWidth(rewardArr))}
          >
            {tableHeader.map((title) => (
              <HeaderTitle>{title}</HeaderTitle>
            ))}
          </HeaderTable>
          <ContentTable isScrollable={minWidthTable > node?.getBoundingClientRect().width}>
            {tableContent?.length > 0 &&
              tableContent.map(({ level, count_partners, volume, reward }, index) => {
                return (
                  <StyledTableRow
                    className={`${index < (levelData?.data ?? 1) - 1 && 'active'} ${
                      index === (levelData?.data ?? 1) - 2 && 'activeBorder'
                    }`}
                    level={level}
                    count_partners={count_partners}
                    volume={volume}
                    reward={reward}
                    isActive={index < (levelData?.data ?? 1) - 1}
                    minWidthLevels={Math.ceil(getMinWidth(levelsArr))}
                    minWidthCountPartners={Math.ceil(getMinWidth(countPartnersArr))}
                    minWidthVolume={Math.ceil(getMinWidth(volumeArr))}
                    minWidthReward={Math.ceil(getMinWidth(rewardArr))}
                  />
                );
              })}
          </ContentTable>
        </TableContainer>
        <CardsInfo>
          <StyledCardColorBorder>
            <CardBlock>
              <Label>Реферальная прибыль:</Label>
              <CardText>$ {commonInfo?.totalReward}</CardText>
            </CardBlock>
          </StyledCardColorBorder>
          <StyledCardColorBorder>
            <CardBlock>
              <Label>Общий объем:</Label>
              <CardText>$ {commonInfo?.totalVolume}</CardText>
            </CardBlock>
          </StyledCardColorBorder>
          <StyledCardColorBorder>
            <CardBlock>
              <Label>Приглашено партнеров:</Label>
              <CardText>{commonInfo?.totalUsers}</CardText>
            </CardBlock>
          </StyledCardColorBorder>
          <StyledCardColorBorder>
            <CardBlock>
              <Label>Открытых уровней:</Label>
              <CardText>{(levelData?.data ?? 1) - 1}</CardText>
            </CardBlock>
          </StyledCardColorBorder>
        </CardsInfo>
      </ContentContainer>
    </Wrapper>
  );
};
