import { SelectPckgItemContent } from '@containers/user/investment/components';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { ModalsCtx } from '@features/modals/Modals';
import { Box } from '@mui/material';
import { colorFetch, media, useMediaType } from '@styles/index';
import { FC, useContext, useMemo } from 'react';
import { CloseIconWrapper, StyledCloseIcon, StyledModalButton, Title, Wrapper } from '../../../styles/common';

export const ContentWraper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 0 30px 0;

  ${media.phone} {
    gap: 20px;
  }
`;

const SelectPckgItemBox = styled(Box)`
  padding: 20px 30px;
  background-color: ${colorFetch('background')};

  ${media.phone} {
    padding: 20px 16px;
  }
`;

const ModalContentPackageBox = styled(Box)`
  display: grid;
  grid-template-columns: 0.7fr 1fr 0.5fr;
  padding: 0 30px;

  ${media.phone} {
    padding: 16px;
  }
`;

const ModalContentPackageBtns = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 30px;

  ${media.phone} {
    padding: 0 16px;
  }
`;

interface InvestProps {
  onClose: (e: any) => void;
}

export const Invest: FC<InvestProps> = ({ onClose }) => {
  const { phone } = useMediaType();
  const investData = useContext(ModalsCtx);
  const { currentPckg, amount, onInvestBtnClick } = investData;

  const pckg = useMemo(() => {
    return currentPckg?.hasOwnProperty('profit') ? currentPckg.profit : currentPckg;
  }, [currentPckg]);

  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Инвестировать</Title>

      {pckg && (
        <ContentWraper>
          <SelectPckgItemBox>
            <SelectPckgItemContent heading={'Общая прибыль'} amount={pckg.sumProfit} className={'green greenModal'} />
          </SelectPckgItemBox>
          <ModalContentPackageBox>
            <SelectPckgItemContent heading={'Сумма'} amount={`$${amount}`} className={'blackModal'} />
            <SelectPckgItemContent heading={'Срок'} amount={pckg.period} className={'blackModal'} />
            <SelectPckgItemContent heading={'Ежедневно'} amount={pckg.day_profit} className={'blackModal'} />
          </ModalContentPackageBox>
          <ModalContentPackageBtns>
            <StyledModalButton
              buttonType={ButtonsTypes.CONTAINED_GREEN}
              onClick={() => onInvestBtnClick(pckg.id, amount)}
            >
              Инвестировать
            </StyledModalButton>
          </ModalContentPackageBtns>
        </ContentWraper>
      )}

      {!phone && (
        <CloseIconWrapper onClick={onClose}>
          <StyledCloseIcon />
        </CloseIconWrapper>
      )}
    </Wrapper>
  );
};
