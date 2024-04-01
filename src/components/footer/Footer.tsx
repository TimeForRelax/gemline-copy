import styled from '@emotion/styled';
import { Box, css, Link, Typography } from '@mui/material';
import { colorFetch, media } from '@styles/index';
import { FooterLinks, footerLinksData } from './data';

import { ReactComponent as DarkLogo } from '@assets/images/common/logo/dark_logo.svg';

const hoverEffectSvg = css`
  & path {
    transition: all 0.2s linear;
    fill: ${colorFetch('gray1')};
  }

  &:hover {
    & path {
      fill: ${colorFetch('green')};
    }
  }
`;

const FooterWrapper = styled(Box)`
  width: 100%;
  position: relative;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${colorFetch('border1')};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  ${media.tablet} {
    padding: 20px 0;
  }

  ${media.phone} {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const LeftBox = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 50px;

  ${media.tabletPro} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }

  ${media.phone} {
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledDarkLogo = styled(DarkLogo)`
  & g path {
    fill: ${colorFetch('gray1')};
  }
`;

const RightBox = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 50px;

  ${media.tabletPro} {
    flex-direction: column-reverse;
    justify-content: space-between;
    gap: 20px;
  }
`;

const GemlineInc = styled(Typography)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;

const TermsOfUseLink = styled(Link)`
  color: ${colorFetch('gray1')};
  font-family: Gilroy600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  transition: all 0.2s linear;

  &:hover {
    color: ${colorFetch('green')};
  }
`;

const IconsLink = styled(Link)`
  width: 30px;
  height: 30px;

  ${hoverEffectSvg}
`;

const IconsBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <LeftBox>
        <StyledDarkLogo />
        <GemlineInc>© 2024 «Gemline» LTD</GemlineInc>
      </LeftBox>
      <RightBox>
        <TermsOfUseLink href={'/terms'} underline={'none'}>
          {/* Правила пользования */}
        </TermsOfUseLink>
        <IconsBox>
          {footerLinksData.map((el: FooterLinks, index: number) => {
            return (
              <IconsLink key={index} href={el.link} underline={'none'} target={'_blank'}>
                {el.icon}
              </IconsLink>
            );
          })}
        </IconsBox>
      </RightBox>
    </FooterWrapper>
  );
};
