import { Buttons } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import { getPath, View } from '@routes/index';
import { colorFetch, media } from '@styles/index';
import { FC } from 'react';
import { useNavigate } from 'react-router';

const EmptyContractsInformationBox = styled(Box)`
  display: flex;
  width: 100%;
  padding: 16px 30px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 2px solid ${colorFetch('border')};
  gap: 5px;

  ${media.tabletPro} {
    padding: 20px;
  }

  ${media.phone} {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const EmptyContractsInformationText = styled(Typography)`
  color: ${colorFetch('black')};
  opacity: 0.4;
  font-family: Gilroy600;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;

  ${media.tabletPro} {
    font-size: 16px;
  }
`;

const StyledButtons = styled(Buttons)`
  padding: 16px 32px;
  border-radius: 16px;
  width: max-content;

  ${media.phone} {
    width: 100%;
  }
`;

interface EmptyContractsProps {}

export const EmptyContracts: FC<EmptyContractsProps> = () => {
  const navigate = useNavigate();
  return (
    <EmptyContractsInformationBox>
      <EmptyContractsInformationText>У вас нет действующих контрактов</EmptyContractsInformationText>
      <StyledButtons
        buttonType={ButtonsTypes.CONTAINED_GREEN}
        startIcon={<AddIcon />}
        onClick={() => navigate(getPath(View.USER_INVESTMENT))}
      >
        Инвестировать
      </StyledButtons>
    </EmptyContractsInformationBox>
  );
};
