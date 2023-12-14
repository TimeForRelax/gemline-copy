import { StyledDrawer } from '@components/drawer';
import { ModalContentHeaderTitle } from '@components/modal/StyledModal';
import { FC } from 'react';
import {
  CloseButton,
  DrawerContentBox,
  DrawerContentHeader,
  DrawerContentPackageBox,
  DrawerContentPackageBtns,
  ModalInvestButton,
} from '../styles/common/common';
import { SelectPckgItemContent } from '../selectPckgItemContent/SelectPckgItemContent';

interface InvestDrawerProps {
  open: boolean;
  onClose: () => void;
  onInvestClick: () => void;
  investAmount: string;
  currentPckg: any;
}

export const InvestDrawer: FC<InvestDrawerProps> = ({ open, onClose, onInvestClick, investAmount, currentPckg }) => {
  return (
    <StyledDrawer anchor={'bottom'} open={open} onClose={onClose}>
      <DrawerContentHeader>
        <ModalContentHeaderTitle>Инвестировать</ModalContentHeaderTitle>
      </DrawerContentHeader>
      <DrawerContentBox>
        <DrawerContentPackageBox>
          <SelectPckgItemContent heading={'Сумма'} amount={`$${investAmount}`} />
          {currentPckg?.contentData.map((item: any, i: number) => (
            <SelectPckgItemContent
              key={i}
              heading={item.heading}
              amount={item.amount}
              className={item.amount.slice(0, 1) === '$' && !currentPckg.promo ? 'green' : ''}
            />
          ))}
        </DrawerContentPackageBox>
        <DrawerContentPackageBtns>
          <CloseButton onClick={onClose}>Назад</CloseButton>
          <ModalInvestButton onClick={onInvestClick}>Инвестировать</ModalInvestButton>
        </DrawerContentPackageBtns>
      </DrawerContentBox>
    </StyledDrawer>
  );
};
