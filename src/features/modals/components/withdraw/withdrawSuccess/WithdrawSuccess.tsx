import { ButtonsTypes } from '@enums/index';
import { useMediaType } from '@styles/index';
import { FC } from 'react';
import {
  CloseIconWrapper,
  ContentWraper,
  InfoText,
  StyledCloseIcon,
  StyledModalButton,
  Title,
  Wrapper,
} from '../../../styles/common';

interface WithdrawSuccessProps {
  onClose: (e: any) => void;
}

export const WithdrawSuccess: FC<WithdrawSuccessProps> = ({ onClose }) => {
  const { phone } = useMediaType();
  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Операция в обработке</Title>
      <ContentWraper>
        <InfoText>Платеж будет выплачен в течение 72 часов.</InfoText>

        <StyledModalButton buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={onClose}>
          Ок
        </StyledModalButton>
      </ContentWraper>

      {!phone && (
        <CloseIconWrapper onClick={onClose}>
          <StyledCloseIcon />
        </CloseIconWrapper>
      )}
    </Wrapper>
  );
};
