import styled from '@emotion/styled';
import { ReactComponent as CloseIcon } from '@assets/images/common/close_icon.svg';
import { colorFetch, media } from '@styles/index';
import { Box, Typography } from '@mui/material';
import { Buttons } from '@components/index';

export const Wrapper = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  border-radius: 20px;
  background: ${colorFetch('white')};

  &.isModal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
    overflow-y: auto;
  }

  ${media.phone} {
    box-shadow: initial;
    border-radius: 0;
  }
`;

export const Title = styled.h2`
  display: inline-block;
  padding: 30px 30px 20px;
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};

  ${media.phone} {
    padding: 20px 16px;
    font-size: 18px;
  }
`;

export const CloseIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  padding: 5px;
  position: absolute;
  top: 27px;
  right: 30px;
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  width: 24px;
  height: 24px;

  & path {
    stroke: ${colorFetch('black')};
  }
`;

export const ContentWraper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 30px 30px 30px;

  ${media.phone} {
    gap: 20px;
    padding: 0 20px 20px 20px;
  }
`;

export const InfoText = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
`;

export const StyledModalButton = styled(Buttons)`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  padding: 18px 32px;

  ${media.phone} {
    padding: 14px 32px;
  }
`;
