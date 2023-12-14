import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { colorFetch, media, theme, useMediaType } from '@styles/index';
import { FC, useState } from 'react';
import { data } from './data/data';
import { InvestDrawer } from './components/investDrawer/InvestDrawer';
import { InvestModal } from './components/investModal/InvestModal';
import { InvestSuccessDrawer } from './components/investSuccessDrawer/InvestSuccessDrawer';
import { InvestSuccessModal } from './components/investSuccessModal/InvestSuccessModal';
import { SelectPckgItemContent } from './components/selectPckgItemContent/SelectPckgItemContent';

const SelectPckgBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`;

const SelectPckgBoxItem = styled(Box) <{ promo: boolean; disabled: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 12px 14px 12px 30px;
  border-radius: 12px;
  background: ${({ promo }) => (promo ? `${colorFetch('green')({ theme })}` : `${colorFetch('gray')({ theme })}`)};
  box-shadow: 0px 2px 4px 0px ${colorFetch('shadow_gray')({ theme })} inset;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};

  ${media.tabletPro} {
    gap: 15px;
    padding: 12px 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
  }
`;

const InvestButton = styled(Button) <{ promo: boolean }>`
  width: max-content;
  height: max-content;
  margin: auto 0;
  padding: 16px 32px;
  border-radius: 8px;
  background-color: ${({ promo }) =>
    promo ? `${colorFetch('white')({ theme })}` : `${colorFetch('green')({ theme })}`};
  color: ${({ promo }) => (promo ? `${colorFetch('green')({ theme })}` : `${colorFetch('white')({ theme })}`)};
  font-family: Nunito600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-transform: initial;
  box-shadow: none;
  border: 1px solid transparent;

  &:hover {
    background-color: ${({ promo }) =>
    promo ? `${colorFetch('light_green_hover')({ theme })}` : `${colorFetch('light_green_hover')({ theme })}`};
    color: ${colorFetch('white')({ theme })};
    border: ${({ promo }) => (promo ? `1px solid ${colorFetch('white')({ theme })}` : `1px solid transparent`)};
    box-shadow: none;
  }

  ${media.tabletPro} {
    width: 100%;
    grid-column: span 3;
  }
`;
interface SelectPackageProps {
  disabled: boolean;
}

export const SelectPackage: FC<SelectPackageProps> = ({ disabled }) => {
  const { phone } = useMediaType();
  const [currentPckg, setCurrentPckg] = useState<any>(null);
  const [isOpenInvestInterface, setIsOpenInvestInterface] = useState<boolean>(false);
  const [isOpenSuccesInterface, setIsOpenSuccesInterface] = useState<boolean>(false);

  const openInvestInterface = (pckg: any) => {
    setCurrentPckg(pckg);
    setIsOpenInvestInterface(true);
  };

  const closeInvestInterface = () => {
    setCurrentPckg(null);
    setIsOpenInvestInterface(false);
  };

  const closeInvestSuccessInterface = () => {
    setIsOpenSuccesInterface(false);
  };

  const onInvestBtnClick = () => {
    closeInvestInterface();
    setIsOpenSuccesInterface(true);
  };

  return (
    <SelectPckgBox>
      {data.map((pckg: any) => (
        <SelectPckgBoxItem key={pckg.id} promo={pckg.promo} disabled={disabled}>
          {pckg.contentData.map((item: any, i: number) => (
            <SelectPckgItemContent
              key={i}
              heading={item.heading}
              amount={item.amount}
              className={item.amount.slice(0, 1) === '$' && !pckg.promo ? 'green' : ''}
            />
          ))}
          <InvestButton promo={pckg.promo} onClick={() => openInvestInterface(pckg)}>
            Инвестировать
          </InvestButton>
        </SelectPckgBoxItem>
      ))}
      <InvestModal
        open={!phone && isOpenInvestInterface}
        onClose={closeInvestInterface}
        currentPckg={currentPckg}
        investAmount={'3200'}
        onInvestClick={onInvestBtnClick}
      />
      <InvestDrawer
        open={phone && isOpenInvestInterface}
        onClose={closeInvestInterface}
        currentPckg={currentPckg}
        investAmount={'3200'}
        onInvestClick={onInvestBtnClick}
      />
      <InvestSuccessModal open={!phone && isOpenSuccesInterface} onClose={closeInvestSuccessInterface} />
      <InvestSuccessDrawer open={phone && isOpenSuccesInterface} onClose={closeInvestSuccessInterface} />
    </SelectPckgBox>
  );
};
