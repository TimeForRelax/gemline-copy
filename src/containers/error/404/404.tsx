import { Footer } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { getPath, View } from '@routes/index';
import { colorFetch } from '@styles/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonWrapper, Container, ContentWrapper, StyledButtons, Text, Wrapper } from '../common/styles';

import { ReactComponent as Logo404 } from '@assets/images/errors/404.svg';

const StyledLogo404 = styled(Logo404)`
  width: 250px;
  height: 110px;

  & g path {
    stroke: ${colorFetch('gray1')};
  }
`;

interface Error404Props {}

export const Error404: FC<Error404Props> = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentWrapper>
        <Container>
          <StyledLogo404 />
          <Text>Такой страницы не существует или вы перешли по неверной ссылке</Text>
          <ButtonWrapper>
            <StyledButtons buttonType={ButtonsTypes.CONTAINED_GREEN} onClick={() => navigate(getPath(View.REDIRECT))}>
              Вернуться на начальную страницу
            </StyledButtons>
          </ButtonWrapper>
        </Container>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
