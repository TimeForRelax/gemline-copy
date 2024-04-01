import styled from '@emotion/styled';
import { colorFetch } from '@styles/index';
import { FC, ReactNode } from 'react';

const Card = styled.div`
  padding: 20px;
  border-radius: 16px;
  background-color: ${colorFetch('background')};
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.active {
    border: 2px solid ${colorFetch('blue')};
  }
`;

const Icon = styled.div`
  margin: 0 auto;

  & svg {
    width: 100px;
    height: 100px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colorFetch('border1')};
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.span`
  font-family: Gilroy700;
  font-size: 18px;
  color: ${colorFetch('black')};
`;

const Reward = styled.span`
  display: flex;
  justify-content: space-between;
  font-family: Gilroy700;
  font-size: 14px;
  color: ${colorFetch('black')};

  & > span {
    font-family: Gilroy500;
    color: ${colorFetch('gray1')};
  }
`;

const Volume = styled.span`
  display: flex;
  justify-content: space-between;
  font-family: Gilroy700;
  font-size: 14px;
  color: ${colorFetch('black')};

  & > span {
    font-family: Gilroy500;
    color: ${colorFetch('gray1')};
  }
`;

interface RankCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  name: string;
  reward: string;
  volume: string;
}

export const RankCard: FC<RankCardProps> = ({ icon, title, name, reward, volume, ...props }) => {
  return (
    <Card {...props}>
      <Icon>{icon}</Icon>
      <Line></Line>
      <TextContent>
        <Name>{name}</Name>
        <Reward>
          <span>Награда: </span>
          {'$ ' + reward}
        </Reward>
        <Volume>
          <span>Объем: </span>
          {'$ ' + volume}
        </Volume>
      </TextContent>
    </Card>
  );
};
