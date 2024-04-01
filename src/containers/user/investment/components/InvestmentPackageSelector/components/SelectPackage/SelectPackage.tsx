import { useInvestToPackage } from '@api/index';
import { Buttons, ResponsiveModal } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes, LsValueType, ModalsTypes } from '@enums/index';
import { Modals } from '@features/index';
import { Box } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { useQueryClient } from '@tanstack/react-query';
import { ls } from '@utils/index';
import { FC, useState } from 'react';
import { decimal } from 'src/consts';
import { SelectPckgItemContent } from './components/selectPckgItemContent/SelectPckgItemContent';

const SelectPckgBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`;

const SelectPckgBoxItem = styled(Box)<{ promo: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 12px 14px 12px 30px;
  border-radius: 24px;
  background-color: ${({ promo }) => (promo ? `${colorFetch('green')}` : `${colorFetch('white')}`)};

  ${media.tabletPro} {
    gap: 15px;
    padding: 12px 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
  }
`;

const StyledButtons = styled(Buttons)`
  width: max-content;

  ${media.tabletPro} {
    width: 100%;
    grid-column: span 3;
  }
`;

interface SelectPackageProps {
  disabled: boolean;
  calcPromoPackageProfit: any;
  calcPckgsProfit: any;
  isShowPromo: boolean;
  amount: any;
}

export const SelectPackage: FC<SelectPackageProps> = ({
  disabled,
  calcPromoPackageProfit,
  calcPckgsProfit,
  isShowPromo,
  amount,
}) => {
  const queryClient = useQueryClient();
  const [currentPckg, setCurrentPckg] = useState<any>(null);
  const [isOpenInvest, setIsOpenInvest] = useState<boolean>(false);
  const [isOpenInvestSuccess, setIsOpenInvestSuccess] = useState<boolean>(false);
  const [isOpenInvestError, setIsOpenInvestError] = useState<boolean>(false);

  const openInvestInterface = (pckg: any) => {
    setCurrentPckg(pckg);
    setIsOpenInvest(true);
  };

  const closeInvestInterface = () => {
    setCurrentPckg(null);
    setIsOpenInvest(false);
  };

  const closeInvestSuccessInterface = () => {
    setIsOpenInvestSuccess(false);
  };

  const closeInvestErrorInterface = () => {
    setIsOpenInvestError(false);
  };

  const investSuccess = () => {
    closeInvestInterface();
    setIsOpenInvestSuccess(true);
    queryClient.invalidateQueries({ queryKey: ['balance'] });
  };

  const investError = () => {
    closeInvestInterface();
    setIsOpenInvestError(true);
  };

  const invest = useInvestToPackage({
    onSuccess: investSuccess,
    onError: investError,
  });

  const onInvestBtnClick = (pckgId: number, amount: any) => {
    const token = ls.get(LsValueType.token);
    invest({
      ContractId: pckgId,
      Amount: (BigInt(amount) * decimal).toString(),
      Token: token,
    });
  };

  return (
    <SelectPckgBox>
      {isShowPromo && (
        <SelectPckgBoxItem promo={true}>
          <SelectPckgItemContent heading={'«Промо» срок'} amount={calcPromoPackageProfit.period} className={'promo'} />
          <SelectPckgItemContent heading={'Ежедневно'} amount={calcPromoPackageProfit.day_profit} className={'promo'} />
          <SelectPckgItemContent
            heading={'Общая прибыль'}
            amount={calcPromoPackageProfit.sumProfit}
            className={'promo'}
          />
          <StyledButtons
            buttonType={ButtonsTypes.CONTAINED_WHITE}
            onClick={() => openInvestInterface(calcPromoPackageProfit)}
            disabled={disabled}
          >
            Инвестировать
          </StyledButtons>
        </SelectPckgBoxItem>
      )}
      {calcPckgsProfit &&
        calcPckgsProfit.map((el: any) => (
          <SelectPckgBoxItem key={el.id} promo={false}>
            <SelectPckgItemContent heading={'Срок'} amount={el.profit.period} className={''} />
            <SelectPckgItemContent heading={'Ежедневно'} amount={el.profit.day_profit} className={''} />
            <SelectPckgItemContent heading={'Общая прибыль'} amount={el.profit.sumProfit} className={'green'} />

            <StyledButtons
              buttonType={ButtonsTypes.CONTAINED_GREEN}
              onClick={() => openInvestInterface(el)}
              disabled={disabled}
            >
              Инвестировать
            </StyledButtons>
          </SelectPckgBoxItem>
        ))}
      <ResponsiveModal isOpen={isOpenInvest} onClose={closeInvestInterface}>
        <Modals
          type={ModalsTypes.INVEST}
          onClose={closeInvestInterface}
          otherProps={{ currentPckg, amount, onInvestBtnClick: onInvestBtnClick }}
        />
      </ResponsiveModal>
      <ResponsiveModal isOpen={isOpenInvestSuccess} onClose={closeInvestSuccessInterface}>
        <Modals type={ModalsTypes.INVEST_SUCCESS} onClose={closeInvestSuccessInterface} />
      </ResponsiveModal>
      <ResponsiveModal isOpen={isOpenInvestError} onClose={closeInvestErrorInterface}>
        <Modals type={ModalsTypes.INVEST_ERROR} onClose={closeInvestErrorInterface} />
      </ResponsiveModal>
    </SelectPckgBox>
  );
};
