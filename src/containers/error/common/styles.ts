import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { colorFetch, media } from '@styles/index';

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled(Box)`
  width: 100%;
  flex: 1;

  ${media.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 154px;
  border: 2px solid ${colorFetch('border')};
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  padding: 74px;

  ${media.tablet} {
    width: 100%;
    padding: 40px 20px;
    margin-top: 0;
  }
`;

export const Text = styled.div`
  font-family: Gilroy500, sans-serif;
  font-size: 16px;
  color: ${colorFetch('gray1')};
  padding: 30px 0;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  margin: 0 auto;
  min-width: 200px;
  width: max-content;

  ${media.phone} {
    min-width: initial;
    width: 100%;
  }
`;

export const StyledButtons = styled(Buttons)`
  padding: 16px 32px;
  border-radius: 8px;
`;
