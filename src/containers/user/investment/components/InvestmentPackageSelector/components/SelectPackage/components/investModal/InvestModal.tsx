import { StyledModal } from '@components/modal/StyledModal';
import { FC } from 'react';
import {
  CloseButton,
  ModalContentPackageBox,
  ModalContentPackageBtns,
  ModalInvestButton,
} from '../styles/common/common';
import { SelectPckgItemContent } from '../selectPckgItemContent/SelectPckgItemContent';

interface InvestModalProps {
  open: boolean;
  onClose: () => void;
  onInvestClick: () => void;
  investAmount: string;
  currentPckg: any;
}

export const InvestModal: FC<InvestModalProps> = ({ open, onClose, onInvestClick, investAmount, currentPckg }) => {
  return (
    <StyledModal open={open} onClose={onClose} title="Инвестировать">
      <ModalContentPackageBox>
        <SelectPckgItemContent heading={'Сумма'} amount={`$${investAmount}`} />
        {currentPckg?.contentData.map((item: any, i: number) => (
          <SelectPckgItemContent
            key={i}
            heading={item.heading}
            amount={item.amount}
            className={item.amount.slice(0, 1) === '$' && !currentPckg.promo ? 'green' : ''}
          />
        ))}
      </ModalContentPackageBox>
      <ModalContentPackageBtns>
        <CloseButton onClick={onClose}>Назад</CloseButton>
        <ModalInvestButton onClick={onInvestClick}>Инвестировать</ModalInvestButton>
      </ModalContentPackageBtns>
    </StyledModal>
  );
};
