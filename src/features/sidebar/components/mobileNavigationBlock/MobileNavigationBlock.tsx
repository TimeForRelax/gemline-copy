import styled from '@emotion/styled';
import { getPath, View } from '@routes/index';
import { colorFetch } from '@styles/index';
import { useViewMatch } from '@utils/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ActiveContractsIcon } from '@assets/images/sidebar/contracts/mobile_active_contracts.svg';
import { ReactComponent as ContractsIcon } from '@assets/images/sidebar/contracts/mobile_contracts.svg';
import { ReactComponent as ActiveHistoryIcon } from '@assets/images/sidebar/history/mobile_active_history.svg';
import { ReactComponent as HistoryIcon } from '@assets/images/sidebar/history/mobile_history.svg';
import { ReactComponent as ActiveInvestmentIcon } from '@assets/images/sidebar/investment/mobile_active_investment.svg';
import { ReactComponent as InvestmentIcon } from '@assets/images/sidebar/investment/mobile_investment.svg';
import { ReactComponent as ActivePartnersIcon } from '@assets/images/sidebar/partners/mobile_active_partners.svg';
import { ReactComponent as PartnersIcon } from '@assets/images/sidebar/partners/mobile_partners.svg';
import { ReactComponent as ActiveUserIcon } from '@assets/images/sidebar/profile/mobile_active_user_icon.svg';
import { ReactComponent as UserIcon } from '@assets/images/sidebar/profile/mobile_user_icon.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkBlock = styled.div<{ activeColor: string }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & .icon {
    & path {
      fill: ${colorFetch('gray1')};
    }
  }

  & .active_icon {
    display: none;
  }

  &.active {
    & span {
      color: ${({ activeColor }) => activeColor};
    }

    & .icon {
      display: none;
    }

    & .active_icon {
      display: block;
    }
  }
`;

const Text = styled.span`
  font-family: Gilroy500;
  font-size: 11px;
  color: ${colorFetch('gray1')};
`;

interface LinksDataType {
  icon: any;
  activeIcon: any;
  text: string;
  activeColor: string;
  view: keyof typeof View;
}

interface MobileNavigationBlockProps {}

export const MobileNavigationBlock: FC<MobileNavigationBlockProps> = () => {
  const navigate = useNavigate();

  const matchPath = useViewMatch();

  const linksData: LinksDataType[] = [
    {
      icon: <InvestmentIcon className={'icon'} />,
      activeIcon: <ActiveInvestmentIcon className={'active_icon'} />,
      text: 'Инвестиции',
      activeColor: colorFetch('green'),
      view: View.USER_INVESTMENT,
    },
    {
      icon: <ContractsIcon className={'icon'} />,
      activeIcon: <ActiveContractsIcon className={'active_icon'} />,
      text: 'Контракты',
      activeColor: colorFetch('red'),
      view: View.USER_CONTRACTS,
    },
    {
      icon: <PartnersIcon className={'icon'} />,
      activeIcon: <ActivePartnersIcon className={'active_icon'} />,
      text: 'Партнерство',
      activeColor: colorFetch('blue'),
      view: View.USER_PARTNERS,
    },
    {
      icon: <HistoryIcon className={'icon'} />,
      activeIcon: <ActiveHistoryIcon className={'active_icon'} />,
      text: 'История',
      activeColor: colorFetch('purple'),
      view: View.USER_HISTORY,
    },
    {
      icon: <UserIcon className={'icon'} />,
      activeIcon: <ActiveUserIcon className={'active_icon'} />,
      text: 'Профиль',
      activeColor: colorFetch('blue'),
      view: View.USER_PROFILE,
    },
  ];

  return (
    <Wrapper>
      {linksData.map(({ icon, activeIcon, text, activeColor, view }: LinksDataType) => (
        <LinkBlock
          key={text}
          className={matchPath(view as any) ? 'active' : ''}
          onClick={() => navigate(getPath(view as any))}
          activeColor={activeColor}
        >
          {icon}
          {activeIcon}
          <Text>{text}</Text>
        </LinkBlock>
      ))}
    </Wrapper>
  );
};
