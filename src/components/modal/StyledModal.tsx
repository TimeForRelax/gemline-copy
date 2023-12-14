import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Box, Modal, Typography } from '@mui/material';
import { ReactComponent as CloseIcon } from '@assets/images/common/close_icon.svg';
import { colorFetch, theme } from '@styles/index';

const ModalContentWrapper = styled(Box)`
  width: 600px;
  height: max-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 20px;
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px ${colorFetch('shadow_gray')({ theme })} inset;
  flex-shrink: 0;
  outline: none;
`;

export const ModalContentHeader = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid ${colorFetch('mid_gray')({ theme })};
`;

export const ModalContentHeaderTitle = styled(Typography)`
  color: ${colorFetch('white')({ theme })};
  font-family: Nunito700;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    path {
      stroke: ${colorFetch('silver_chalice')({ theme })};
    }
  }
`;

export const ModalContentBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
`;

interface StyledModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const StyledModal: FC<StyledModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContentWrapper>
        <ModalContentHeader>
          <ModalContentHeaderTitle>{title}</ModalContentHeaderTitle>
          <StyledCloseIcon onClick={onClose} />
        </ModalContentHeader>
        <ModalContentBox>{children}</ModalContentBox>
      </ModalContentWrapper>
    </Modal>
  );
};
