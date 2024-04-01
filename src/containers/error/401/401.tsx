import { Footer } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { logOut } from '@features/index';
import { FC } from 'react';
import { ButtonWrapper, Container, ContentWrapper, StyledButtons, Text, Wrapper } from '../common/styles';

import { ReactComponent as Logo401 } from '@assets/images/errors/401.svg';

const StyledLogo401 = styled(Logo401)`
  width: 250px;
  height: 110px;
`;

interface Error401Props {}

export const Error401: FC<Error401Props> = () => {
  const handleClick = () => {
    logOut();
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Container>
          <StyledLogo401 />
          <Text>Пользователь не авторизован</Text>
          <ButtonWrapper>
            <StyledButtons buttonType={ButtonsTypes.CONTAINED_GREEN} onClick={handleClick}>
              Авторизация
            </StyledButtons>
          </ButtonWrapper>
        </Container>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
