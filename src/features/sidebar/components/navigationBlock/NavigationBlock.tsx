import styled from '@emotion/styled';
import { getPath, View } from '@routes/index';
import { colorFetch, theme } from '@styles/index';
import { useViewMatch } from '@utils/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ContractsIcon } from '@assets/images/sidebar/contracts/contracts.svg';
import { ReactComponent as ActiveContractsIcon } from '@assets/images/sidebar/contracts/active_contracts.svg';
import { ReactComponent as InvestmentIcon } from '@assets/images/sidebar/investment/investment.svg';
import { ReactComponent as ActiveInvestmentIcon } from '@assets/images/sidebar/investment/active_investment.svg';
import { ReactComponent as PartnersIcon } from '@assets/images/sidebar/partners/partners.svg';
import { ReactComponent as ActivePartnersIcon } from '@assets/images/sidebar/partners/active_partners.svg';
import { ReactComponent as HistoryIcon } from '@assets/images/sidebar/history/history.svg';
import { ReactComponent as ActiveHistoryIcon } from '@assets/images/sidebar/history/active_history.svg';

const Wrapper = styled.div`
  border-radius: 12px;
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const LinkBlock = styled.div<{ activeColor: string; hoverColor: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  transition: background-color 0.2s linear;

  &.active {
    cursor: default;
    padding: 16px;
    gap: 18px;
    background-color: ${({ activeColor }) => activeColor};

    & .icon {
      display: none;
    }

    & .active_icon {
      display: block;
    }

    &:hover {
      & span {
        color: ${colorFetch('white')({ theme })};
      }
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

const Text = styled.span`
  font-family: Nunito600;
  font-size: 16px;
  color: ${colorFetch('white')({ theme })};
  transition: color 0.2s linear;
`;

interface LinksDataType {
  icon: any;
  activeIcon: any;
  text: string;
  hoverColor: string;
  activeColor: string;
  view: keyof typeof View;
}

interface NavigationBlockProps { }

export const NavigationBlock: FC<NavigationBlockProps> = () => {
  const navigate = useNavigate();

  const matchPath = useViewMatch();

  const linksData: LinksDataType[] = [
    {
      icon: <ContractsIcon className={'icon'} />,
      activeIcon: <ActiveContractsIcon className={'active_icon'} />,
      text: 'Мои контракты',
      hoverColor: colorFetch('red')({ theme }),
      activeColor: colorFetch('red')({ theme }),
      view: View.USER_CONTRACTS,
    },
    {
      icon: <InvestmentIcon className={'icon'} />,
      activeIcon: <ActiveInvestmentIcon className={'active_icon'} />,
      text: 'Инвестиции',
      hoverColor: colorFetch('green')({ theme }),
      activeColor: colorFetch('green')({ theme }),
      view: View.USER_INVESTMENT,
    },
    {
      icon: <PartnersIcon className={'icon'} />,
      activeIcon: <ActivePartnersIcon className={'active_icon'} />,
      text: 'Партнерство',
      hoverColor: colorFetch('blue')({ theme }),
      activeColor: colorFetch('blue')({ theme }),
      view: View.USER_PARTNERS,
    },
    {
      icon: <HistoryIcon className={'icon'} />,
      activeIcon: <ActiveHistoryIcon className={'active_icon'} />,
      text: 'История',
      hoverColor: colorFetch('purple')({ theme }),
      activeColor: colorFetch('purple')({ theme }),
      view: View.USER_HISTORY,
    },
  ];

  return (
    <Wrapper>
      {linksData.map(({ icon, activeIcon, text, activeColor, hoverColor, view }: LinksDataType) => (
        <LinkBlock
          key={text}
          className={matchPath(view as any) ? 'active' : ''}
          onClick={() => navigate(getPath(view as any))}
          activeColor={activeColor}
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
