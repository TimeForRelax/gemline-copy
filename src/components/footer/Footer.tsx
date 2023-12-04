import styled from '@emotion/styled';
import { Box, Link, Typography } from '@mui/material';
import { colorFetch, media, theme } from '@styles/index';
import { FooterLinks, footerLinksData } from './data';

// @ts-ignore
import { ReactComponent as DarkLogo } from '@assets/images/common/logo/dark_logo.svg';

const FooterWrapper = styled(Box)`
  position: relative;
  padding: 0 70px;
  width: 100%;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:after {
    content: '';
    width: calc(100% - 140px);
    height: 1px;
    background-color: ${colorFetch('dark_mako_grey')({ theme })};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  ${media.tablet`

  `}
`;

const LeftBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 60px;

  ${media.tablet`
    flex-direction: column;
  `}
`;

const RightBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 60px;

  ${media.tablet`
    flex-direction: column;
  `}
`;

const GemlineInc = styled(Typography)`
  color: ${colorFetch('dark_grey')({ theme })};
  font-family: Nunito600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;

const TermsOfUseLink = styled(Link)`
  color: ${colorFetch('dark_grey')({ theme })};
  font-family: Nunito600;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
`;

const IconsLink = styled(Link)`
  width: 30px;
  height: 30px;
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
        <DarkLogo />
        <GemlineInc>© 2023 «Gemline» LTD</GemlineInc>
      </LeftBox>
      <RightBox>
        <TermsOfUseLink href={'/terms'} underline={'none'}>
          Правила пользования
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
