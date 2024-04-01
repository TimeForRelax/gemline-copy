import styled from '@emotion/styled';
import { getPath, View } from '@routes/index';
import { colorFetch } from '@styles/index';
import { useViewMatch } from '@utils/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ContractsIcon } from '@assets/images/sidebar/contracts/contracts.svg';
import { ReactComponent as HistoryIcon } from '@assets/images/sidebar/history/history.svg';
import { ReactComponent as InvestmentIcon } from '@assets/images/sidebar/investment/investment.svg';
import { ReactComponent as PartnersIcon } from '@assets/images/sidebar/partners/partners.svg';

const Wrapper = styled.div`
  border-radius: 12px;
  background: ${colorFetch('white')};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const LinkBlock = styled.div<{ hoverColor: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 16px;
  transition: background-color 0.2s linear;

  &.active {
    cursor: default;
    background-color: ${colorFetch('background')};

    & .active_icon {
      display: block;
    }

    & .icon {
      display: none;
    }

    & span {
      color: ${({ hoverColor }) => hoverColor};
    }
  }

  & .active_icon {
    display: none;
  }

  &:hover {
    & span {
      color: ${({ hoverColor }) => hoverColor};
    }
  }
`;

const StyledInvestmentIcon = styled(InvestmentIcon)`
  & > rect {
    display: none;
  }
`;

const StyledContractsIcon = styled(ContractsIcon)`
  & > rect {
    display: none;
  }
`;

const StyledPartnersIcon = styled(PartnersIcon)`
  & > rect {
    display: none;
  }
`;

const StyledHistoryIcon = styled(HistoryIcon)`
  & > rect {
    display: none;
  }
`;

const Text = styled.span`
  font-family: Gilroy600;
  font-size: 16px;
  color: ${colorFetch('gray')};
  transition: color 0.2s linear;
`;

interface LinksDataType {
  icon: any;
  activeIcon: any;
  text: string;
  hoverColor: string;
  view: keyof typeof View;
}

interface NavigationBlockProps {}

export const NavigationBlock: FC<NavigationBlockProps> = () => {
  const navigate = useNavigate();

  const matchPath = useViewMatch();

  const linksData: LinksDataType[] = [
    {
      icon: <InvestmentIcon className={'icon'} />,
      activeIcon: <StyledInvestmentIcon className={'active_icon'} />,
      text: 'Инвестиции',
      hoverColor: colorFetch('green'),
      view: View.USER_INVESTMENT,
    },
    {
      icon: <ContractsIcon className={'icon'} />,
      activeIcon: <StyledContractsIcon className={'active_icon'} />,
      text: 'Мои контракты',
      hoverColor: colorFetch('red'),
      view: View.USER_CONTRACTS,
    },
    {
      icon: <PartnersIcon className={'icon'} />,
      activeIcon: <StyledPartnersIcon className={'active_icon'} />,
      text: 'Партнерство',
      hoverColor: colorFetch('blue'),
      view: View.USER_PARTNERS,
    },
    {
      icon: <HistoryIcon className={'icon'} />,
      activeIcon: <StyledHistoryIcon className={'active_icon'} />,
      text: 'История',
      hoverColor: colorFetch('purple'),
      view: View.USER_HISTORY,
    },
  ];

  return (
    <Wrapper>
      {linksData.map(({ icon, activeIcon, text, hoverColor, view }: LinksDataType) => (
        <LinkBlock
          key={text}
          className={matchPath(view as any) ? 'active' : ''}
          onClick={() => navigate(getPath(view as any))}
          hoverColor={hoverColor}
        >
          {icon}
          {activeIcon}
          <Text>{text}</Text>
        </LinkBlock>
      ))}
    </Wrapper>
  );
};
