import { FC, HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colorFetch, media } from '@styles/index';

const Card = styled.div`
  background-color: ${colorFetch('white')};
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.phone} {
    padding: 20px;
  }
`;

interface CardColorBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardColorBorder: FC<CardColorBorderProps> = ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>;
};
