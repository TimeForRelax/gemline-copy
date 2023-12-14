import { StyledModal } from '@components/modal/StyledModal';
import { FC } from 'react';
import { ModalInvestButton, SuccessModalText } from '../styles/common/common';

interface InvestSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const InvestSuccessModal: FC<InvestSuccessModalProps> = ({ open, onClose }) => {
  return (
    <StyledModal open={open} onClose={onClose} title="Успешно">
      <SuccessModalText>
        Драгоценные камни имеют высокую ликвидность и прозрачную ценовую политику; <br />
        Цена на бриллианты регулируется еженедельным прайс-листом.
      </SuccessModalText>
      <ModalInvestButton onClick={onClose}>К моим контрактам</ModalInvestButton>
    </StyledModal>
  );
};
