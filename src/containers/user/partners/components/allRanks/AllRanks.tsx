import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { colorFetch, media } from '@styles/index';
import { FC, useState } from 'react';
import { RankCard } from '../rankCard/RankCard';

import { ReactComponent as Arrow } from '@assets/images/common/arrow.svg';

const Wrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: auto auto;
  gap: 20px;
  transition: grid-template-rows 0.2s linear;
  margin-bottom: 60px;

  ${media.tabletPro} {
    margin-bottom: 30px;
  }
`;

const StyledSelectButton = styled(Buttons)`
  box-sizing: border-box;
  transition: all 0.2s linear;
  padding: 12px 16px;
  min-width: 200px;

  &.opened {
    background-color: ${colorFetch('green_background')};

    & div span {
      color: ${colorFetch('green')};
    }

    & div svg path {
      stroke: ${colorFetch('green')};
    }
  }

  ${media.phone} {
    grid-area: 1/1/1 / span 3;
  }
`;

const ButtonContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  font-family: Gilroy600;
  font-size: 14px;
  color: ${colorFetch('white')};
`;

const StyledArrow = styled(Arrow)`
  transition: all 0.2s linear;

  &.open {
    transform: rotate(-180deg);
  }
`;

const CollapsableWrapper = styled.div`
  grid-area: 2/1/2 / span 3;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s;

  &.open {
    grid-template-rows: 1fr;
  }
`;

const CollapsableContent = styled.div`
  overflow: hidden;
`;

const AllRanksContainer = styled.div`
  padding: 30px;
  background-color: ${colorFetch('white')};
  border-radius: 24px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;

  ${media.tablet} {
    grid-template-columns: repeat(10, minmax(200px, max-content));
    grid-template-rows: 1fr;
    overflow-x: scroll;
  }
`;

interface AllRanksProps {
  ranks: any[];
  userRankData: any;
}

export const AllRanks: FC<AllRanksProps> = ({ ranks, userRankData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <StyledSelectButton
        className={isOpen && 'opened'}
        buttonType={ButtonsTypes.CONTAINED_GREEN}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ButtonContent>
          <Text>Все ранги</Text>
          <StyledArrow className={isOpen && 'open'} />
        </ButtonContent>
      </StyledSelectButton>

      <CollapsableWrapper className={isOpen && 'open'}>
        <CollapsableContent>
          <AllRanksContainer>
            {ranks.map(({ icon, title, name, reward, volume }, index) => {
              if (index === 0) {
                return null;
              }

              return (
                <RankCard
                  className={index + 1 === userRankData?.data?.RankId && 'active'}
                  icon={icon}
                  title={title}
                  name={name}
                  reward={reward}
                  volume={volume}
                />
              );
            })}
          </AllRanksContainer>
        </CollapsableContent>
      </CollapsableWrapper>
    </Wrapper>
  );
};
