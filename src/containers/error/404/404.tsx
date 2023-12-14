import { Footer } from '@components/index';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { getPath, View } from '@routes/index';
import { colorFetch, media, theme } from '@styles/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as NotFountLogo } from '@assets/images/common/404.svg';

const Wrapper = styled.div``;

const ContentWrapper = styled(Box)`
  padding: 40px 0;

  ${media.phone} {
    padding: 30px 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 116px;
  border: 1px solid gray;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  padding: 74px;

  ${media.phone} {
    padding: 40px 20px;
    margin-top: 0;
  }
`;

const Text = styled.div`
  font-family: Nunito400, sans-serif;
  font-size: 16px;
  color: ${colorFetch('gray1')({ theme })};
  padding: 30px 0;
  text-align: center;
`;

const StyledButton = styled(Button)<{
  backgroundColor?: string;
  backgroundColorHovered?: string;
  fontColor?: string;
  borderColor?: string;
}>`
  max-width: 250px;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Nunito600, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: ${({ fontColor }) => fontColor && colorFetch(fontColor)({ theme })};
  letter-spacing: normal;
  text-transform: none;
  background-color: ${({ backgroundColor }) => backgroundColor && colorFetch(backgroundColor)({ theme })};
  border-radius: 8px;
  border-color: ${({ borderColor }) => borderColor && colorFetch(borderColor)({ theme })};
  margin: 0 auto;
  padding: 16px 30px;

  &:hover {
    ${({ borderColor }) => borderColor && `border-color: ${borderColor}`};
    background-color: rgba(227, 80, 92, 0.1);
  }
`;

interface Error404Props {}

export const Error404: FC<Error404Props> = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentWrapper>
        <Container>
          <NotFountLogo />
          <Text>Такой страницы не существует или вы перешли по неверной ссылке</Text>
          <StyledButton
            fontColor="red"
            borderColor="red"
            variant="outlined"
            onClick={() => navigate(getPath(View.USER_CONTRACTS))}
          >
            Вернуться в мои контракты
          </StyledButton>
        </Container>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};
