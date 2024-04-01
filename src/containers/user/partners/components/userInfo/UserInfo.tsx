import { CardColorBorder } from '@components/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorFetch, media } from '@styles/index';
import { FC, useState } from 'react';

import { useInviterName, useRefCode, useRefferalReward } from '@api/index';
import { ReactComponent as CopyIcon } from '@assets/images/common/copy_icon.svg';
import { convertBigMoney } from '@utils/convertTo';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 20px;
  margin-bottom: 60px;

  ${media.tabletPro} {
    grid-template-columns: 1fr 1fr;
  }

  ${media.tablet} {
    grid-template-columns: 100%;
  }
`;

const StyledCardColorBorder = styled(CardColorBorder)`
  padding: 20px 30px;

  &.withoutName {
    grid-area: 1/1 / 1 / span 2;
  }

  ${media.tabletPro} {
    &:last-child {
      grid-area: 2/1/2 / span 2;
    }
  }

  ${media.tablet} {
    &.withoutName,
    &:last-child {
      grid-area: auto;
    }
  }

  ${media.phone} {
    padding: 20px;
  }
`;

const commonCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
`;

const NameBlock = styled.div`
  ${commonCss}
`;

const BalanceBlock = styled.div`
  ${commonCss}
`;

const ReferralLink = styled.div`
  ${commonCss}
`;

const Label = styled.span`
  font-family: Gilroy500;
  font-size: 16px;
  color: ${colorFetch('gray')};
`;

const NameText = styled.span`
  font-family: Gilroy700;
  font-size: 16px;
  color: ${colorFetch('black')};
`;

const BalanceText = styled.span`
  font-family: Gilroy700;
  font-size: 24px;
  color: ${colorFetch('black')};
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const Link = styled.a`
  display: inline-block;
  font-family: Gilroy600;
  font-size: 16px;
  color: ${colorFetch('green')};
  text-decoration: underline;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

interface UserInfoProps {
  ranksReward: any;
}

export const UserInfo: FC<UserInfoProps> = ({ ranksReward }) => {
  const [copied, setCopied] = useState(false);

  const { data: inviterNameData } = useInviterName();

  const { data: refferalRewardData } = useRefferalReward();

  const { data: refCodeData } = useRefCode();

  const link = refCodeData?.data
    ? `${window.location.origin}/invite?ref=${refCodeData.data}`
    : `${window.location.origin}/invite`;

  const handleClickCopyRefferalLink = () => {
    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log('Адрес скопирован в буфер обмена');
          setCopied(true);
        })
        .catch((err) => {
          console.error('Ошибка при копировании адреса: ', err);
        });
    }
  };

  return (
    <Wrapper>
      {inviterNameData?.data && (
        <StyledCardColorBorder>
          <NameBlock>
            <Label>Приглашение:</Label>
            <NameText>{inviterNameData?.data}</NameText>
          </NameBlock>
        </StyledCardColorBorder>
      )}
      <StyledCardColorBorder className={!inviterNameData?.data && 'withoutName'}>
        <BalanceBlock>
          <Label>Общий доход:</Label>
          <BalanceText>{`$ ${
            refferalRewardData?.data && ranksReward
              ? convertBigMoney(refferalRewardData?.data, true).plus(ranksReward).toFixed(2)
              : '0.00'
          }`}</BalanceText>
          {/* <BalanceText>{`$ ${(Number(BigInt(refferalRewardData?.data ?? 0)) / Number(decimal)).toFixed(
            2,
          )}`}</BalanceText> */}
        </BalanceBlock>
      </StyledCardColorBorder>
      <StyledCardColorBorder>
        <ReferralLink>
          <Label>Ваша реферальная ссылка:</Label>
          <LinkWrapper>
            <Link>{link}</Link>
            <StyledCopyIcon className={copied && 'copied'} onClick={handleClickCopyRefferalLink} />
          </LinkWrapper>
        </ReferralLink>
      </StyledCardColorBorder>
    </Wrapper>
  );
};
