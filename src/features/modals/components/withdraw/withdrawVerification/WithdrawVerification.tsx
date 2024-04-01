import { ReactComponent as UploadIcon } from '@assets/images/sidebar/verification/upload_icon.svg';
import { ReactComponent as VerificationIcon } from '@assets/images/sidebar/verification/verification.svg';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { colorFetch, useMediaType } from '@styles/index';
import { FC } from 'react';
import { CloseIconWrapper, ContentWraper, InfoText, StyledCloseIcon, Title, Wrapper } from '../../../styles/common';

const StyledVerificationIcon = styled(VerificationIcon)`
  margin: 0 auto;
`;

const ButtonContentBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledUploadText = styled(Typography)`
  font-family: Gilroy600;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
`;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const sx = {
  width: '100%',
  textTransform: 'none',
  fontFamily: 'Gilroy600',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  color: `${colorFetch('white')}`,
  backgroundColor: `${colorFetch('green')}`,
  border: '1px solid transparent',
  borderColor: 'transparent',
  borderRadius: '16px',
  padding: '14px 32px',
  boxShadow: 'none',
  transition: 'all .2s easy-in-out',

  '&:hover': {
    backgroundColor: `${colorFetch('light_green_hover')}`,
    borderColor: 'transparent',
    color: `${colorFetch('white')}`,
    boxShadow: 'none',
  },
};

interface WithdrawVerificationProps {
  onClose: (e: any) => void;
}

export const WithdrawVerification: FC<WithdrawVerificationProps> = ({ onClose }) => {
  const { phone } = useMediaType();

  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Верификация личности</Title>
      <ContentWraper>
        <InfoText>
          Для вывода средств необходима верификация вашей личности. Загрузите фотографию вашего лица с паспортом, как на
          примере:
        </InfoText>

        <StyledVerificationIcon />
        <Button sx={sx} component="label" variant="contained" startIcon={''}>
          <ButtonContentBox>
            <StyledUploadText>Загрузить фотографию</StyledUploadText>
            <UploadIcon />
          </ButtonContentBox>
          <VisuallyHiddenInput type="file" onChange={(e) => console.log(e.target.files[0])} />
        </Button>
      </ContentWraper>

      {!phone && (
        <CloseIconWrapper onClick={onClose}>
          <StyledCloseIcon />
        </CloseIconWrapper>
      )}
    </Wrapper>
  );
};
