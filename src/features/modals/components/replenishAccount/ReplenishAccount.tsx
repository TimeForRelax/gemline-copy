import { useDepositWallet } from '@api/index';
import { Buttons, EndAdornment, InputWithEndAdornment } from '@components/index';
import styled from '@emotion/styled';
import { ButtonsTypes } from '@enums/index';
import { getPath, View } from '@routes/index';
import { colorFetch, media, useMediaType } from '@styles/index';
import QRCode from 'qrcode.react';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseIconWrapper, StyledCloseIcon, Title, Wrapper } from '../../styles/common';

import { ReactComponent as HelpCircleIcon } from '@assets/images/activePackage/help-circle.svg';
import { ReactComponent as CopyIcon } from '@assets/images/common/copy_icon.svg';
import { useGlobalState } from 'src/globalContext';

const BalanceWrapper = styled.div`
  padding: 20px 30px;
  background-color: ${colorFetch('background')};
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.phone} {
    padding: 12px 16px;
  }
`;

const BalanceLabel = styled.span`
  color: ${colorFetch('gray')};
  font-family: Gilroy500;
  font-size: 16px;

  ${media.phone} {
    font-size: 14px;
  }
`;

const BalanceContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.phone} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }
`;

const Balance = styled.span`
  color: ${colorFetch('black')};
  font-family: Gilroy700;
  font-size: 30px;

  ${media.phone} {
    font-size: 24px;
  }
`;

const BalanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledHelpCircleIcon = styled(HelpCircleIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;

  & path {
    stroke: ${colorFetch('gray1')};
  }
`;

const InfoText = styled.span`
  color: ${colorFetch('gray1')};
  font-family: Gilroy500;
  font-size: 14px;
`;

const ChooseNetworkWrapper = styled.div`
  position: relative;
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-color: ${colorFetch('mid_gray_border')};
  }

  ${media.phone} {
    padding: 20px 16px;
  }
`;

const ChooseNetworkLabel = styled.span`
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 16px;

  ${media.phone} {
    font-size: 14px;
  }
`;

const ChooseNetworkContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const NetworkChipWrapper = styled.div`
  background-color: ${colorFetch('background')};

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

const NetworkChip = styled.span`
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 16px;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${colorFetch('border')};
  }

  &.active {
    background-color: ${colorFetch('black')};
    color: ${colorFetch('white')};

    &:hover {
      background-color: ${colorFetch('black')};
    }
  }

  ${media.phone} {
    font-size: 14px;
  }
`;

const AddressWrapper = styled.div`
  padding: 24px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.phone} {
    padding: 20px 16px;
  }
`;

const AddressLabel = styled.span`
  color: ${colorFetch('black')};
  font-family: Gilroy500;
  font-size: 16px;

  ${media.phone} {
    font-size: 14px;
  }
`;

const AddressContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  justify-content: center;

  ${media.phone} {
    gap: 20px;
  }
`;

const StyledCopyIcon = styled(CopyIcon)`
  cursor: pointer;

  & g path {
    transition: all 0.2s linear;
  }

  &:hover {
    & g path {
      fill: ${colorFetch('green')};
      transition: all 0.2s linear;
    }
  }

  &.copied {
    & g {
      opacity: 1;
    }

    & g path {
      fill: ${colorFetch('green')};
    }
  }
`;

const WrapperAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HelperText = styled.span`
  color: ${colorFetch('gray')};
  font-family: Gilroy600;
  font-size: 14px;
`;

const StyledQRCode = styled(QRCode)`
  margin: 0 auto;
`;

const WrapperButton = styled.div`
  padding: 0 30px 30px;

  ${media.phone} {
    padding: 0 16px 34px;
  }
`;

const StyledButtons = styled(Buttons)`
  padding: 16px 32px;
`;

interface ReplenishAccountProps {
  onClose: (e: any) => void;
}

export const ReplenishAccount: FC<ReplenishAccountProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { balance } = useGlobalState();

  const { phone } = useMediaType();

  const dataNetworks = [
    { text: 'Tron (TRC20)', value: 'Tron' },
    { text: 'Ethereum (ERC20)', value: 'Ethereum' },
    { text: 'BNB Chain (BEP20)', value: 'BinanceSmartChain' },
  ];

  const [network, setNetwork] = useState<string>(dataNetworks[0].value);
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);

  const handleClickCopyAddress = () => {
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          setCopied(true);
          console.log('Адрес скопирован в буфер обмена');
        })
        .catch((err) => {
          console.error('Ошибка при копировании адреса: ', err);
        });
    }
  };

  useEffect(() => {
    setCopied(false);
  }, [network]);

  const { data, isSuccess, isError, error } = useDepositWallet(network);

  useEffect(() => {
    if (isSuccess) {
      setAddress(data.data);
    }

    if (isError) {
      console.error(error);
      navigate(getPath(View.ERROR_500));
    }
  }, [data, error, isError, isSuccess]);

  return (
    <Wrapper className={!phone && 'isModal'}>
      <Title>Пополнение</Title>

      <BalanceWrapper>
        <BalanceLabel>Ваш баланс:</BalanceLabel>
        <BalanceContainer>
          <Balance>{balance} USDT</Balance>
          <BalanceInfoContainer>
            {/* <StyledHelpCircleIcon />
            <InfoText>Как купить USDT?</InfoText> */}
          </BalanceInfoContainer>
        </BalanceContainer>
      </BalanceWrapper>

      <ChooseNetworkWrapper>
        <ChooseNetworkLabel>Выберите сеть</ChooseNetworkLabel>
        <ChooseNetworkContent>
          {dataNetworks.map((el) => (
            <NetworkChipWrapper>
              <NetworkChip className={network === el.value && 'active'} onClick={() => setNetwork(el.value)}>
                {el.text}
              </NetworkChip>
            </NetworkChipWrapper>
          ))}
        </ChooseNetworkContent>
      </ChooseNetworkWrapper>

      <AddressWrapper>
        <AddressLabel>Адрес для пополнения</AddressLabel>
        <AddressContent>
          <WrapperAddress>
            <InputWithEndAdornment
              label={''}
              value={address ?? ''}
              placeholder={'Адрес кошелька'}
              type={'text'}
              name={'address'}
              error={false}
              helperText={''}
              rules={{}}
              endAdornment={
                <EndAdornment
                  state={true}
                  handleClickIcon={handleClickCopyAddress}
                  icon1={<StyledCopyIcon className={copied && 'copied'} />}
                />
              }
            />

            <HelperText>После отправки средств на указанный адрес, они появятся на вашем балансе</HelperText>
          </WrapperAddress>

          <StyledQRCode
            value={address}
            size={160}
            level="H"
            bgColor={colorFetch('white')}
            fgColor={colorFetch('black')}
          />
        </AddressContent>
      </AddressWrapper>

      <WrapperButton>
        <StyledButtons buttonType={ButtonsTypes.CONTAINED_GREEN} onClick={onClose}>
          Закрыть
        </StyledButtons>
      </WrapperButton>

      {!phone && (
        <CloseIconWrapper onClick={onClose}>
          <StyledCloseIcon />
        </CloseIconWrapper>
      )}
    </Wrapper>
  );
};
