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

interface InvestErrorProps {
  onClose: (e: any) => void;
}

export const InvestError: FC<InvestErrorProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { phone } = useMediaType();
  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Ошибка</Title>
      <ContentWraper>
        <InfoText>Что то пошло не так. Мы делаем все возможное для устранения проблемы.</InfoText>

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
