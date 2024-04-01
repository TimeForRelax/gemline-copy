import { ButtonsTypes } from '@enums/index';
import { getPath, View } from '@routes/index';
import { useMediaType } from '@styles/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CloseIconWrapper,
  ContentWraper,
  InfoText,
  StyledCloseIcon,
  StyledModalButton,
  Title,
  Wrapper,
} from '../../../styles/common';

interface InvestSuccessProps {
  onClose: (e: any) => void;
}

export const InvestSuccess: FC<InvestSuccessProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { phone } = useMediaType();
  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Контракт добавлен</Title>
      <ContentWraper>
        <InfoText>
          За обновлением статуса контракта, срокам и суммы прибыли вы можете следить в разделе «Мои контракты»
        </InfoText>

        <StyledModalButton
          buttonType={ButtonsTypes.CONTAINED_GREEN}
          onClick={() => navigate(getPath(View.USER_CONTRACTS))}
        >
          Мои контракты
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
