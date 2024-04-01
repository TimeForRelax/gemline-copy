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

interface WithdrawVerificationSuccessProps {
  onClose: (e: any) => void;
}

export const WithdrawVerificationSuccess: FC<WithdrawVerificationSuccessProps> = ({ onClose }) => {
  const { phone } = useMediaType();

  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Верификация пройдена</Title>
      <ContentWraper>
        <InfoText>Вы успешно прошли верификацию. Теперь вам доступен вывод средств.</InfoText>

        <StyledModalButton buttonType={ButtonsTypes.CONTAINED_GREEN} onClick={onClose}>
          Перейти в инвестиции
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
