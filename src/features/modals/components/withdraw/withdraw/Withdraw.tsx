import { useGetWithDrawCode } from '@api/withdraw/getCode';
import { useConfirmWithDrawCode } from '@api/withdraw/withdrawConfirm';
import { EndAdornment, Input, InputWithEndAdornment } from '@components/index';
import { ButtonsTypes, LsValueType } from '@enums/index';
import { ModalsCtx } from '@features/modals/Modals';
import { useMediaType } from '@styles/index';
import { useQueryClient } from '@tanstack/react-query';
import { ls } from '@utils/index';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { decimal } from 'src/consts';
import { useGlobalState } from 'src/globalContext';
import { CloseIconWrapper, StyledCloseIcon, Title, Wrapper } from '../../../styles/common';
import {
  AllAmountText,
  AmountAndErrorBox,
  ButtonsWrapper,
  EndAdornmentTypography,
  ErrorSmsBox,
  ErrorText,
  InputWrapper,
  LabelText,
  SmsHelperText,
  StyledCodeButton,
  StyledInput,
  StyledToggleButton,
  StyledToggleButtonGroup,
  ToggleButtonsBox,
  WithdrawalBox,
  WithdrawalForm,
  WithdrawalInfoAmount,
  WithdrawalInfoBox,
  WithdrawalInfoHeading,
  WithdrawalInfoWrapper,
} from './styles/styles';

interface IFormInput {
  amount: string;
  wallet_address: string;
  sms_code: string;
  paymentMethod: string;
}

interface WithdrawProps {
  onClose: (e: any) => void;
}

export const Withdraw: FC<WithdrawProps> = ({ onClose }) => {
  const { balance } = useGlobalState();
  const queryClient = useQueryClient();

  const modalsProp = useContext(ModalsCtx);

  const { phone } = useMediaType();

  const { handleSubmit, register, watch, formState, setValue, reset, setError, trigger } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: {
      amount: '',
      wallet_address: '',
      sms_code: '',
      paymentMethod: 'Tron',
    },
  });

  const amount = watch('amount');
  const wallet_address = watch('wallet_address');
  const paymentMethod = watch('paymentMethod');

  const { errors } = formState;

  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isDisableConfirm, setIsDisableConfirm] = useState(true);
  const [isDisableFields, setIsDisableFields] = useState(false);
  const [unconfirmedWithdrawRequestId, setUnconfirmedWithdrawRequestId] = useState(null);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          resetTimer();
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const startTimer = () => {
    resetTimer();
    setIsRunning(true);
  };

  const resetTimer = () => {
    setSeconds(60);
    setIsRunning(false);
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setValue('paymentMethod', newAlignment);
  };

  const calculatedCommission = useMemo(() => {
    const commissionPercent = 2.5;
    if (Number(amount)) {
      const commission = (Number(amount) * commissionPercent) / 100;
      return {
        commission: commission.toFixed(3),
        toBeWithdrawn: (Number(amount) - commission).toFixed(3),
      };
    } else
      return {
        commission: 0,
        toBeWithdrawn: 0,
      };
  }, [amount]);

  useEffect(() => {
    amount && trigger(['amount']);
  }, [amount, trigger]);

  const onHandleCloseClick = () => {
    reset();
    resetTimer();
    setUnconfirmedWithdrawRequestId(null);
    setIsDisableConfirm(true);
    setIsDisableFields(false);
    onClose('');
  };

  const confirmCodeSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['balance'] });
    onHandleCloseClick();
    modalsProp.openWithdrawSuccess();
  };

  const confirmCodeError = ({ response }: any) => {
    const errorMessages = {
      'request not found': 'Введен неправильный код',
      'failed to send transaction for update: confirm code expired': 'Срок действия кода истек',
      'failed to send transaction for update: insufficient balance': 'Недостаточно средств',
    };

    setError('sms_code', {
      type: 'manual',
      message: errorMessages[response.data] || 'Введен неправильный код',
    });
  };

  const confirmCode = useConfirmWithDrawCode({
    onSuccess: confirmCodeSuccess,
    onError: confirmCodeError,
  });

  const onSubmit = (data: IFormInput) => {
    const token = ls.get(LsValueType.token);
    confirmCode({
      UnconfirmedWithdrawRequestId: unconfirmedWithdrawRequestId ?? null,
      ConfirmCode: Number(data.sms_code),
      Token: token,
    });
  };

  const getCodeSuccess = ({ data }: any) => {
    startTimer();
    setIsDisableFields(true);
    setIsDisableConfirm(false);
    setUnconfirmedWithdrawRequestId(data);
  };

  const getCodeError = ({ response }: any) => {
    if (response.data === 'invalid address') {
      setError('wallet_address', {
        type: 'manual',
        message: 'Введен неправильный адрес',
      });
    }
  };

  const getCode = useGetWithDrawCode({
    onSuccess: getCodeSuccess,
    onError: getCodeError,
  });

  const onGetCodeClick = (amount, wallet_address, paymentMethod) => {
    const token = ls.get(LsValueType.token);
    trigger(['amount', 'wallet_address']);
    if (!amount || !wallet_address) return;

    getCode({
      AssetId: 1,
      Amount: (BigInt(amount) * decimal).toString(),
      Address: wallet_address,
      Network: paymentMethod,
      Token: token,
    });
  };

  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Вывод средств</Title>
      <WithdrawalForm component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <WithdrawalBox>
          <InputWithEndAdornment
            label={'Сумма вывода'}
            placeholder={'Введите сумму'}
            type={'text'}
            name={'amount'}
            error={!!errors.amount}
            helperText={''}
            disabled={isDisableFields}
            rules={{
              ...register('amount', {
                required: 'Обязательное поле',
                validate: (value) => {
                  if (Number(value) < 50) return 'Минимальная сумма вывода 50$';
                  if (
                    Number(calculatedCommission.toBeWithdrawn) + Number(calculatedCommission.commission) >
                    Number(balance)
                  )
                    return 'Недостаточно средств';
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Разрешен ввод только цифр',
                },
              }),
            }}
            endAdornment={
              <EndAdornment
                state={false}
                handleClickIcon={() => {}}
                icon1={<EndAdornmentTypography>USDT</EndAdornmentTypography>}
                icon2={<EndAdornmentTypography>USDT</EndAdornmentTypography>}
              />
            }
          />
          <AmountAndErrorBox>
            <AllAmountText
              className={isDisableFields ? 'disabled' : ''}
              onClick={() => setValue('amount', Number(balance).toFixed(0).toString(), { shouldValidate: true })}
            >
              Все {balance} USDT
            </AllAmountText>
            <ErrorText>{errors.amount?.message}</ErrorText>
          </AmountAndErrorBox>
          <WithdrawalInfoWrapper>
            <WithdrawalInfoBox>
              <WithdrawalInfoHeading>Комиссия:</WithdrawalInfoHeading>
              <WithdrawalInfoAmount>{calculatedCommission.commission} USDT</WithdrawalInfoAmount>
            </WithdrawalInfoBox>
            <WithdrawalInfoBox>
              <WithdrawalInfoHeading>К выводу:</WithdrawalInfoHeading>
              <WithdrawalInfoAmount>{calculatedCommission.toBeWithdrawn} USDT</WithdrawalInfoAmount>
            </WithdrawalInfoBox>
          </WithdrawalInfoWrapper>
        </WithdrawalBox>
        <ToggleButtonsBox>
          <LabelText>Выберите сеть</LabelText>
          <StyledToggleButtonGroup
            color="standard"
            value={watch('paymentMethod')}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            disabled={isDisableFields}
          >
            <StyledToggleButton value="Tron">Tron (TRC20)</StyledToggleButton>
            <StyledToggleButton value="Ethereum">BNB Chain (BEP20)</StyledToggleButton>
            <StyledToggleButton value="BinanceSmartChain">Ethereum (ERC20)</StyledToggleButton>
          </StyledToggleButtonGroup>
        </ToggleButtonsBox>

        <InputWrapper>
          <Input
            label={'Адрес кошелька'}
            placeholder={'Введите адрес'}
            type={'text'}
            name={'wallet_address'}
            error={!!errors.wallet_address}
            helperText={''}
            disabled={isDisableFields}
            rules={{ ...register('wallet_address', { required: 'Обязательное поле' }) }}
          />
          <ErrorText>{errors.wallet_address?.message}</ErrorText>
        </InputWrapper>
        <InputWrapper className="email-code">
          <StyledInput
            label={'E-mail код подтверждения '}
            placeholder={'Введите код'}
            type={'text'}
            name={'sms_code'}
            error={!!errors.sms_code}
            helperText={''}
            rules={{ ...register('sms_code', { required: 'Обязательное поле' }) }}
            disabled={isDisableConfirm}
          />
          <StyledCodeButton
            buttonType={ButtonsTypes.CONTAINED_GRAY}
            disabled={isRunning}
            className={isRunning ? 'sms' : 'sms'}
            onClick={() => onGetCodeClick(amount, wallet_address, paymentMethod)}
          >
            Получить код
          </StyledCodeButton>
          <ErrorSmsBox>
            <ErrorText>{errors.sms_code?.message}</ErrorText>
            {isRunning && <SmsHelperText>Отправить повторно можно через {seconds} сек</SmsHelperText>}
          </ErrorSmsBox>
        </InputWrapper>
        <ButtonsWrapper>
          <StyledCodeButton buttonType={ButtonsTypes.CONTAINED_GRAY} onClick={onHandleCloseClick}>
            Назад
          </StyledCodeButton>
          <StyledCodeButton buttonType={ButtonsTypes.CONTAINED_GREEN} type={'submit'} disabled={isDisableConfirm}>
            Вывести
          </StyledCodeButton>
        </ButtonsWrapper>
      </WithdrawalForm>

      {!phone && (
        <CloseIconWrapper onClick={onClose}>
          <StyledCloseIcon />
        </CloseIconWrapper>
      )}
    </Wrapper>
  );
};
