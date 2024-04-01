import styled from '@emotion/styled';
import { colorFetch } from '@styles/index';
import { FC } from 'react';

import { ReactComponent as LogoIcon } from '@assets/images/common/logo/colored_logo.svg';
import { LANDING_URL } from 'src/consts';

const Wrapper = styled.div`
  border-radius: 12px;
  background: ${colorFetch('white')};
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.15) inset;
`;

const StyledLogoIcon = styled(LogoIcon)`
  cursor: pointer;
  width: 250px;
  height: 90px;
  padding: 16px 0;
`;

interface LogoBlockProps {}

export const LogoBlock: FC<LogoBlockProps> = () => {
  const handleLogo = () => {
    window.location.href = LANDING_URL;
  };

  return (
    <Wrapper>
      <StyledLogoIcon onClick={handleLogo} />
    </Wrapper>
  );
};
