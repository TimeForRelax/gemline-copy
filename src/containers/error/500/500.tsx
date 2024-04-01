import { Footer } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { redirectToLanding } from '@features/index';
import { FC } from 'react';
import { ButtonWrapper, Container, ContentWrapper, StyledButtons, Text, Wrapper } from '../common/styles';

import { ReactComponent as Logo500 } from '@assets/images/errors/500.svg';

const StyledLogo500 = styled(Logo500)`
  width: 250px;
  height: 110px;
`;

interface Error500Props {}

export const Error500: FC<Error500Props> = () => {
  const handleClick = () => {
    redirectToLanding();
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Container>
          <StyledLogo500 />
          <Text>Упс, что то пошло не так</Text>
          <ButtonWrapper>
            <StyledButtons buttonType={ButtonsTypes.CONTAINED_GREEN} onClick={handleClick}>
              На сайт
            </StyledButtons>
          </ButtonWrapper>
        </Container>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
