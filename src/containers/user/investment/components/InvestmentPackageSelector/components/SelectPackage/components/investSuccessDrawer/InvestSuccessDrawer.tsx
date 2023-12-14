import { StyledDrawer } from '@components/drawer';
import { ModalContentHeaderTitle } from '@components/modal/StyledModal';
import { FC } from 'react';
import { DrawerContentBox, DrawerContentHeader, ModalInvestButton, SuccessModalText } from '../styles/common/common';

interface InvestSuccessDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const InvestSuccessDrawer: FC<InvestSuccessDrawerProps> = ({ open, onClose }) => {
  return (
    <StyledDrawer anchor={'bottom'} open={open} onClose={onClose}>
      <DrawerContentHeader>
        <ModalContentHeaderTitle>Успешно</ModalContentHeaderTitle>
      </DrawerContentHeader>
      <DrawerContentBox>
        <SuccessModalText>
          Драгоценные камни имеют высокую ликвидность и прозрачную ценовую политику; <br />
          Цена на бриллианты регулируется еженедельным прайс-листом.
        </SuccessModalText>
        <ModalInvestButton onClick={onClose}>К моим контрактам</ModalInvestButton>
      </DrawerContentBox>
    </StyledDrawer>
  );
};
