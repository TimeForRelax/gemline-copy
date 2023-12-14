import styled from '@emotion/styled';
import { colorFetch, theme } from '@styles/index';
import { FC } from 'react';

import { ReactComponent as LogoIcon } from '@assets/images/common/logo/colored_logo.svg';

const Wrapper = styled.div`
  border-radius: 12px;
  background: ${colorFetch('gray')({ theme })};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
`;

const StyledLogoIcon = styled(LogoIcon)`
  padding: 16px 0;
`;

interface LogoBlockProps { }

export const LogoBlock: FC<LogoBlockProps> = () => {
  return (
    <Wrapper>
      <StyledLogoIcon />
    </Wrapper>
  );
};
